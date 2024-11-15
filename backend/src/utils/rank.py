import json
import os
from functools import reduce
from operator import itemgetter

from utils.json_io import dict_to_json_file, json_file_to_dict

movie_path = '../resources/boxoffice.json'
review_path =  '../resources/review.json'
user_info_path = '../resources/user_info.json'

def calculate_rate() :
    global review_json
    movie_list = json_file_to_dict(movie_path)
    review_json = json_file_to_dict(review_path)

    def reducer(acc, entry):
        movie = entry['movie_id']
        rate = entry['rate']

        if movie not in acc:
            acc[movie] = {"sum": 0, 'count': 0}

        acc[movie]['sum'] += rate
        acc[movie]['count']  += 1

        return acc

    result = reduce(reducer, review_json, {})
    average_ratings = {movie : values['sum'] / values['count'] for movie, values in result.items()}
    

    for movie in movie_list: 
        rating = 0
        movie_id = movie['movie_id']
        if movie_id in average_ratings.keys():
            rating = average_ratings[movie_id]
        movie["avg_rate"] = round(rating)            

    dict_to_json_file(movie_path, movie_list)

# def recommend_movies(movies : dict, id: str, _reverse: bool):
#     user_info = json_file_to_dict(user_info_path)
#     user = {}
#     for info in user_info :
#         if info["id"] == id :
#             user = info
#             break
#     user_preferences = user["favorite"]
#     if user_preferences == []:
#         return sorted(movies, key=lambda x: int(x["movie_id"]), reverse=_reverse)

#     overlap_movies = [
#     {
#         "movie": movie,
#         "overlap_count": sum(1 for genre in movie["genre"] if genre.strip() in user_preferences)  # 겹치는 장르 개수
#     }
#     for movie in movies
#     ]

#     # 겹치는 장르의 개수를 기준으로 내림차순 정렬
#     overlap_movies.sort(key=lambda x: x["overlap_count"], reverse=not(_reverse))
    
#     return overlap_movies



def get_ranking(sort : str, _reverse : bool) : 
   

    global boxoffice_json
    calculate_rate()
    boxoffice_json = json_file_to_dict(movie_path)
    
    if sort == "movie_name":
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("movie_name"), reverse=_reverse)

    elif sort == "movie_id":
        boxoffice_json = sorted(boxoffice_json, key=lambda x: int(x["movie_id"]), reverse=_reverse)

    elif sort == "avg_rate":
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("avg_rate"), reverse=not(_reverse))
    # elif sort == "recommend":
    #     boxoffice_json = recommend_movies(boxoffice_json, id, _reverse); 
    
    return boxoffice_json
