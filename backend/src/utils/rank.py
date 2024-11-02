import json
from json_io import json_file_to_dict
from operator import itemgetter
from functools import reduce

import os

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


boxoffice_json = {}



# review = { movieid : [rate] ,}
# movieid value : [rate value, ...]



def calculate_rate() :
    global review_json
    movie_list = json_file_to_dict(movie_path)
    review_json = json_file_to_dict(review_path)


    print(movie_list)


    def reducer(acc, entry):
        movie = entry['movieName']
        rate = entry['rate']

        if movie not in acc:
            acc[movie] = {"sum": 0, 'count': 0}

        acc[movie]['sum'] += rate
        acc[movie]['count']  += 1

        return acc
    
    result = reduce(reducer, review_json, {})
    # {movie : {sum : 평점 합, count : 리뷰 갯수}}

    average_ratings = {movie: values['sum'] / values['count'] for movie, values in result.items()}

    print(average_ratings)       




    #TODO movie_list에 average_ratings의 key값과 일치하는 영화에 평균별점 필드로 values를 넣어주기
    #TODO 영화이름 찾기 & 포문

    # if average_ratings['movie'] in movie_list['영화명']:
    #     movie_list['영화명'].update({'평균 별점' : average_ratings['movie']})
    """
    
    average_ratings 의 영화 이름 찾기 -> 
    
    """
    # for value in movie_list.values():
    #     for b in average_ratings.keys() :
    #         if b in movie_list.values() :
    #             movie_list.values() = average_ratings['movie']

                



# JSON 파일 열고 읽기

def get_ranking(sort : str, _reverse : bool) : 
    #TODO 
    #1.json_file_to_dict를 이용해서 JSON 파일 읽기 O
    #2. parameter로 정렬기준 받아서 그것에 따라 정렬하기 (1. 순위, 2. 별점)

    global boxoffice_json
    boxoffice_json= json_file_to_dict(movie_path)

    if(sort == "영화명"):
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("영화명"), reverse=_reverse)

    elif(sort == "순위"):
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("순위"), reverse=_reverse)

    elif(sort == "평균 별점"):
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("평균 별점"), reverse=_reverse)

    return boxoffice_json

# get_ranking("영화명", False)
# get_ranking("순위", False)
# get_ranking("평균 별점", True)

calculate_rate()

# print(boxoffice_json)
