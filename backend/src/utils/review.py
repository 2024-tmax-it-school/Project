import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

from utils.json_io import (dict_to_json_file, file_open, json_data_to_dict,
                           json_file_to_dict)
from utils.rank import calculate_rate

# 기본 리뷰 구조
review = {
    "user_id": "",
    "movie_id": "",
    "comment": "",
    "rate": ""
}

# result = { "success" : False}

review_path = 'backend/src/resources/review.json'
movie_path = 'backend/src/resources/boxoffice.json'

# 특정 영화 ID에 대한 리뷰를 가져오는 함수
def get_review(movie_id: str):
    review_json = json_file_to_dict(review_path)
    movie_json = json_file_to_dict(movie_path)
    result = { "success" : False}

    if movie_json==[]:
        return result
    
    result['success'] = True

    for value in movie_json:
        if value['movie_id']==movie_id:
            result = value
            if review_json!=[]:
                result["reviews"] = [review for review in review_json if review.get("movie_id") == str(movie_id)]
            else :
                result["reviews"] = []
            return result
    
    return result

# 리뷰를 등록하는 함수
def register_review(data: dict):
    movie_json = json_file_to_dict(review_path)
    result = {"success": False}
    
    for review in movie_json:
        if review.get("movie_id") == data.get("movie_id") and review.get("user_id") == data.get("user_id"):
            return {
            'success' : False,
            'message' : '같은 아이디로 리뷰가 등록되어있습니다.'
        } #만약 user_id가 중복된다면

    movie_json.append(data)
    dict_to_json_file(review_path, movie_json)
    calculate_rate()
    
    return {
        'success': True,
        'message': '리뷰가 등록되었습니다.'
    }
    


# 리뷰를 수정하는 함수
def edit_review(data: dict):
    movie_json = json_file_to_dict(review_path)
    result = {"success": False}
    if movie_json == []:
        return result
    
    for review in movie_json:
        if review.get("movie_id") == data.get("movie_id") and review.get("user_id") == data.get("user_id"):
            review.update(data)  # 리뷰 내용 업데이트
            dict_to_json_file(review_path, movie_json)
            return {'success': True, 'message': '리뷰가 수정되었습니다.'}
    calculate_rate()

    return {
        'success': False,
        'message': '리뷰를 찾을 수 없습니다.'
    }  # 수정할 리뷰가 없을 경우

# 리뷰를 삭제하는 함수
def delete_review(movie_id: int, user_id: int):
    movie_json = json_file_to_dict(review_path)
    result = {"success": False}
    if movie_json == []:
        return result
    
    original_length = len(movie_json)
    movie_json = [review for review in movie_json if not (review.get("movie_id") == str(movie_id) and review.get("user_id") == str(user_id))]
    
    success = len(movie_json) < original_length
    dict_to_json_file(review_path, movie_json)

    if success:
        calculate_rate()
        return {
            'success': True,
            'message': '리뷰가 삭제되었습니다.'
        }
    
    return {
            'success': False,
            'message': '리뷰를 찾을 수 없습니다.'
        }  # 삭제할 리뷰가 없을 경우