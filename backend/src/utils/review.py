import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

from utils.json_io import (dict_to_json_file, file_open, json_data_to_dict,
                           json_file_to_dict)

# 기본 리뷰 구조
review = {
    "user_id": "",
    "movie_id": "",
    "comment": "",
    "rate": ""
}

review_path = 'backend/src/resources/review.json'

# 특정 영화 ID에 대한 리뷰를 가져오는 함수
def get_review(movie_id: str):
    movie_json = json_file_to_dict(review_path)
    print(movie_json)
    print(movie_id)
    filtered_reviews = [review for review in movie_json if review.get("movie_id") == str(movie_id)]
    return filtered_reviews

# 리뷰를 등록하는 함수
def register_review(data: dict):
    movie_json = json_file_to_dict(review_path)
    movie_json.append(data)
    dict_to_json_file(review_path, movie_json)

    return {
        'success': True,
        'message': '리뷰가 등록되었습니다.'
    }
    
# 리뷰를 수정하는 함수
def edit_review(data: dict):
    movie_json = json_file_to_dict(review_path)
    
    for review in movie_json:
        if review.get("movie_id") == data.get("movie_id") and review.get("user_id") == data.get("user_id"):
            review.update(data)  # 리뷰 내용 업데이트
            dict_to_json_file(review_path, movie_json)
            return {'success': True, 'message': '리뷰가 수정되었습니다.'}

    return {
        'success': False,
        'message': '리뷰를 찾을 수 없습니다.'
    }  # 수정할 리뷰가 없을 경우

# 리뷰를 삭제하는 함수
def delete_review(movie_id: int, user_id: int):
    movie_json = json_file_to_dict(review_path)
    original_length = len(movie_json)
    movie_json = [review for review in movie_json if not (review.get("movie_id") == str(movie_id) and review.get("user_id") == str(user_id))]
    
    success = len(movie_json) < original_length

    if success:
        return {
            'success': True,
            'message': '리뷰가 삭제되었습니다.'
        }
    
    return {
            'success': False,
            'message': '리뷰를 찾을 수 없습니다.'
        }  # 삭제할 리뷰가 없을 경우