from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
<<<<<<< HEAD
from utils.rank import calculate_rate
from utils.json_io import dict_to_json_data, json_data_to_dict
from utils.auth import register, login, fetch
=======
from utils.json_io import dict_to_json_data, json_data_to_dict
from utils.auth import register, login, choice_favorite, edit_user
>>>>>>> 9cbb6ff34496d7004262692ba48af40a7dcd5afa

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
        ###################작성필요########################
        # 힌트 : urlparse, parse_qs 함수를 사용
        ##################################################
        # http://localhost:8080 이후의, /service_name?query_params가 해당한다.
        service_with_query_params = urlparse(self.path)
        # /service_name?query_params 중 /service_name만 추출한다.
        servie_name = service_with_query_params.path
        # /service_name?query_params 중 query_params만 추출한다.
        query_params = parse_qs(service_with_query_params.query)

        return servie_name, query_params

    def do_GET(self):
        self.make_header()
        service_name, service_query = self.divide_path()
        result = {}

        # 서비스에 따라, 적절한 메소드를 호출한다.
<<<<<<< HEAD
        if service_name == '/users':
            result = fetch(service_query['id'][0])
        elif service_name == '/transactions':
            result = getTransactions(service_query['id'][0])

        elif server_name == '/rank':
            result =  calculate_rate()

=======
>>>>>>> 9cbb6ff34496d7004262692ba48af40a7dcd5afa
        if result:
            result_data = dict_to_json_data(result)
            self.wfile.write(result_data.encode('utf-8'))

    def do_POST(self):
        self.make_header()
        service_name, _ = self.divide_path()

        # POST는 body에 데이터가 담겨있기 때문에, 읽어온다.
        json_data = self.rfile.read(int(self.headers['Content-Length'])).decode('utf-8')
        # 읽어온 json 데이터를 딕셔너리로 변환한다.
        dict_data = json_data_to_dict(json_data)
        result = {}

        # 서비스에 따라, 적절한 메소드를 호출한다.
        # 수정 필요
        # if service_name == '/register':
        #     result = register(dict_data)
        # elif service_name == '/login':
        #     result = login(dict_data)
        #     # 코드 작성
        # elif service_name == '/favorite':
        #     favorit_lst=[]
        #     result=choice_favorite()
        # elif service_name == '/edit':
        #     edited={}
        #     result=edit_user()

        if result:
            result_data = dict_to_json_data(result)
            self.wfile.write(result_data.encode('utf-8'))

server_address = ('localhost', 8080)
httpd = HTTPServer(server_address, BankServer)
httpd.serve_forever()