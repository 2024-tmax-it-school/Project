import json
import os
from functools import reduce
from operator import itemgetter

from utils.json_io import json_file_to_dict, dict_to_json_file


movie_path = 'backend/src/resources/boxoffice.json'
review_path =  'backend/src/resources/review.json'


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


def get_ranking(sort : str, _reverse : bool) : 
   

    global boxoffice_json
    boxoffice_json = json_file_to_dict(movie_path)
    
    if sort == "movie_name":
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("movie_name"), reverse=_reverse)

    elif sort == "movie_id":
        boxoffice_json = sorted(boxoffice_json, key=lambda x: int(x["movie_id"]), reverse=_reverse)

    elif sort == "avg_rate":
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("avg_rate"), reverse=_reverse)
    
    return boxoffice_json
