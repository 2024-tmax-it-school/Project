import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from json_io import file_open, json_data_to_dict, json_file_to_dict

review_path = 'backend\src\resources\review.json'

review = {
    "userID" : "",
    "movieID" : "",
    "comment" : "",
    "rate" : ""
}

def get_review(movieId : int):
    movie_json = json_file_to_dict(review_path)
    #TODO movie_json에서 movie id로 찾아서 반환
    #반환 : 해당 영화의 모든 review
    return

def register_review(data : dict):
    #TODO movie_json에 data를 저장
    #반환 : {success: true/false}
    return

def edit_review(data : dict):
    #TODO movie_json에 data에서 id를 찾고 data로 업데이트
    #반환 : {success: true/false}
    return

def delete_review(moview_id :int, userId : int):
    #TODO movie_json에 data에서 id를 찾고 삭제
    #반환 : {success: true/false}
    return 