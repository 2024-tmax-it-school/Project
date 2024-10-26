import json
from json_io import json_file_to_dict
from operator import itemgetter


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
boxoffice_json = {}

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

    elif(sort == "별점"):
        boxoffice_json = sorted(boxoffice_json, key=itemgetter("별점"), reverse=_reverse)

    return boxoffice_json

get_ranking("영화명", False)

print(boxoffice_json)
