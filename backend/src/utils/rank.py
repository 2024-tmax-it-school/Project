import json
import os
from functools import reduce
from operator import itemgetter

from utils.json_io import json_file_to_dict

#json_str = json.dumps(json_data, ensure_ascii=False)
#file = open('20240824_3.json', 'w')
#file.close()
# a_json = open('경로/a.json', encoding = 'utf-8')
# a_dict = json.load(a_json)


"""

랭킹
순위 : 이름
제이슨 불러오기
리스트 -> 제이슨 변환

{이름 : 순위, 이름 : 순위 ...}

"""

# boxoffice_json = {}

# file = open('backend\src\resources\boxoffice.json', 'r')
# boxoffice_json = json.load(file)
# file.close()



# print(boxoffice_json)
movie_path = 'backend/src/resources/boxoffice.json'
review_path =  'backend/src/resources/review.json'


# boxoffice_json = {}
# movie_rate = {}
# review_json = {}
# rate = []
# rewiew = {}


# def calculate_rate(movie_data: dict) :
#     global boxoffice_json
#     boxoffice_json = json_file_to_dict(movie_path)
#     global review_json
#     review_json = json_file_to_dict(movie_path)



# review = { movieid : [rate] ,}
# movieid value : [rate value, ...]



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
    # {movie : {sum : 평점 합, count : 리뷰 갯수}}
    average_ratings = {movie : values['sum'] / values['count'] for movie, values in result.items()}
    


    

    # {'영화1': 4, '영화2' : 5}





    #TODO movie_list에 average_ratings의 key값과 일치하는 영화에 평균별점 필드로 values를 넣어주기
    #TODO 영화이름 찾기 & 포문
    print(average_ratings)

    for movie in movie_list: 
        movie_id = movie['movie_id']

        rating = average_ratings[movie_id]

        print(movie)

        # if(movie[movie_id] == movie_id):
        #     movie['avg_rate'] = rating
                
    print(movie_list)    





    # if average_ratings['movie'] in movie_list['movie_id']:
    #     movie_list['movie_id'].update({'avg_rate' : average_ratings['movie']})
   


                
        # movie_list 에서 movie_id을 찾음. movie_id을 찾은 딕셔너리에 avg_rate을 집어 넣음

# JSON 파일 열고 읽기

def get_ranking(sort : str = 'movie_id', _reverse : bool = False) : 
    #TODO 
    #1.json_file_to_dict를 이용해서 JSON 파일 읽기 O
    #2. parameter로 정렬기준 받아서 그것에 따라 정렬하기 (1. 순위, 2. 별점)

    global boxoffice_json
    boxoffice_json = json_file_to_dict(movie_path)

    if sort == "movie_name":
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("movie_name"), reverse=_reverse)

    elif sort == "movie_id":
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("movie_id"), reverse=_reverse)

    elif sort == "avg_rate":
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("avg_rate"), reverse=_reverse)
    #calculate_rate()
    return boxoffice_json

# get_ranking("movie_name", False)
# get_ranking("movie_id", False)
# get_ranking("avg_rate", True)

calculate_rate()

# print(boxoffice_json)
