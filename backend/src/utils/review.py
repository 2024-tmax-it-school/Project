import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from json_io import file_open, json_data_to_dict, json_file_to_dict, dict_to_json_file

# 기본 리뷰 구조
review = {
    "userID": "",
    "movieID": "",
    "comment": "",
    "rate": ""
}

review_path = 'backend/src/resources/review.json'

# 특정 영화 ID에 대한 리뷰를 가져오는 함수
def get_review(movie_id: int):
    movie_json = json_file_to_dict(review_path)
    filtered_reviews = [review for review in movie_json if review.get("movieID") == str(movie_id)]
    return filtered_reviews

# 리뷰를 등록하는 함수
def register_review(data: dict):
    movie_json = json_file_to_dict(review_path)
    movie_json.append(data)
    return dict_to_json_file(review_path, movie_json)

# 리뷰를 수정하는 함수
def edit_review(data: dict):
    movie_json = json_file_to_dict(review_path)
    
    for review in movie_json:
        if review.get("movieID") == data.get("movieID") and review.get("userID") == data.get("userID"):
            review.update(data)  # 리뷰 내용 업데이트
            return dict_to_json_file(review_path, movie_json)

    return False  # 수정할 리뷰가 없을 경우

# 리뷰를 삭제하는 함수
def delete_review(movie_id: int, user_id: int):
    movie_json = json_file_to_dict(review_path)
    original_length = len(movie_json)
    movie_json = [review for review in movie_json if not (review.get("movieID") == str(movie_id) and review.get("userID") == str(user_id))]
    
    success = len(movie_json) < original_length

    if success:
        return dict_to_json_file(review_path, movie_json)
    
    return False  # 삭제할 리뷰가 없을 경우