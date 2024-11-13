import urllib.parse
from http.server import BaseHTTPRequestHandler, HTTPServer
from inspect import signature
from urllib.parse import parse_qs, urlparse

from utils.auth import edit_user, get_my_page, login, register
from utils.error import ErrorCode
from utils.json_io import dict_to_json_data, json_data_to_dict
from utils.rank import get_ranking
from utils.review import (delete_review, edit_review, get_review,
                          register_review)


class BankServer(BaseHTTPRequestHandler):
    """
    header를 만들어준다.
    """
    def make_header(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    """
    http://localhost:8080/service_name?query_params 형태의 
    URL을 분리한다.
    """
    def divide_path(self) -> tuple:
        service_with_query_params = urlparse(self.path)
        # /service_name?query_params 중 /service_name만 추출한다.
        service_name = service_with_query_params.path
        # /service_name?query_params 중 query_params만 추출한다.
        query_params = parse_qs(service_with_query_params.query)

        return service_name, query_params

    def throw_error(self, error) -> ErrorCode:
        if error == ErrorCode.ERROR_INVALID_QUERY_PARAM:
            return dict_to_json_data({"error": "Check valid query params"})
        elif error == ErrorCode.ERROR_INVALID_SERVICE:
            return dict_to_json_data({"error": "Check valid service"})
        else:
            return dict_to_json_data({"error": "Unknown error"})
    
    # review 관련 처리
    def handle_review(self, dict_data, segments):
        if len(segments) > 1:
            action = segments[2]
            if action == 'edit':
                return edit_review(dict_data)
            elif action == 'register':
                return register_review(dict_data)
            elif action == 'delete' and 'movie_id' in dict_data and 'user_id' in dict_data:
                return delete_review(dict_data['movie_id'], dict_data['user_id'])
            else:
                return self.throw_error(ErrorCode.ERROR_INVALID_SERVICE)
        elif 'movie_id' in dict_data:
            return get_review(dict_data)
        else:
            return self.throw_error(ErrorCode.ERROR_INVALID_QUERY_PARAM)
    

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        self.make_header()
        service_path, service_query = self.divide_path()
        result = {}
        segments = service_path.strip('/').split('/')
        service_name = segments[0]
        
        if service_name == 'detail':
            if 'movie_id' in service_query:
                result = get_review(service_query['movie_id'][0])
            else:
                result = self.throw_error(ErrorCode.ERROR_INVALID_QUERY_PARAM)        
        elif service_name == "my_page":
            result = get_my_page(service_query['user_id'][0])
        elif service_name == 'rank':
            result = get_ranking(service_query['sort'][0], bool(int(service_query['reverse'][0])))
        elif service_name =="logout":
            result = {"success":True}

        # 서비스에 따라, 적절한 메소드를 호출한다.
        if result:
            result_data = dict_to_json_data(result)
            self.wfile.write(result_data.encode('utf-8'))

    def do_POST(self):           
        self.make_header()
        service_path, _ = self.divide_path()
        # POST는 body에 데이터가 담겨있기 때문에, 읽어온다.
        json_data = self.rfile.read(int(self.headers['Content-Length'])).decode('utf-8')
        # 읽어온 json 데이터를 딕셔너리로 변환한다.
        dict_data = json_data_to_dict(json_data)
        result = {}
        segments = service_path.strip('/').split('/')
        service_name = segments[0]
        # 서비스별 메소드 맵핑을 딕셔너리로 관리
        service_methods = {
            'register': register,
            'login': login,
            'detail': self.handle_review,
            'edit': edit_user
        }
        # 서비스 이름에 해당하는 함수 호출
        if service_name in service_methods:
            func = service_methods[service_name]
            sig = signature(func)
            params = sig.parameters
            
            if len(params) == 2:
                result = service_methods[service_name](dict_data, segments)
            else:
                result = service_methods[service_name](dict_data)
        else:
            result = self.throw_error(ErrorCode.ERROR_INVALID_SERVICE)
        if result:
            result_data = dict_to_json_data(result)
            self.wfile.write(result_data.encode('utf-8'))

def run(server_class=HTTPServer, handler_class=BankServer):
    server_class=HTTPServer
    handler_class=BankServer
    server_address = ('0.0.0.0', 8080)  # 0.0.0.0으로 설정하여 모든 IP에서 접속 가능

    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == '__main__':
    run()