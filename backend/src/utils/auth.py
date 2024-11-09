from utils.json_io import dict_to_json_file, json_file_to_dict

user_info_path = 'backend/src/resources/user_info.json'

genre = [ "Action", "Fantasy", "Horror", "Thriller", "Blockbuster", "Romance", "Comedy", "Animation", "Drama"]

"""
회원가입을 수행하는 메소드

new_user_info 
{
    'id' : 아이디,
    'password' : 비밀번호
	'name' : 이름
}

user_info.json
    {
    id:
    pw:
    name:
    favorite : [ ]
    }

reply
{
	success: true/false
}

"""
def register(new_user_info : dict) -> dict:
    # 사용자 정보를 불러온다.
    user_info_dict = json_file_to_dict(user_info_path)
    result_dict : dict = {'success' : True}
    if user_info_dict==[]:
        return result_dict
    for value in user_info_dict:
        if value['id']==new_user_info['id']:
            result_dict.update({'success' : False})
            return result_dict
    new_user_id = new_user_info['id']
    if new_user_id in user_info_dict:
        result_dict.update({'success' : False})

    else:
        user_info_dict.append({'id' : new_user_info['id'], 'password' : new_user_info['password'], 'name' : new_user_info['name'], 'favorite':[]})

    dict_to_json_file(user_info_path, user_info_dict)
    return result_dict

"""
로그인을 수행하는 메소드

new_user_info
{
    'id' : 아이디,
    'password' : 비밀번호
}

user.json
{
 id:
 pw:
}

reply
{
	success: true/false
}


"""



def login(new_user_info : dict) -> dict:
    # TODO user_info에 DATA가 없는경우, 고려해야함
    user_info_dict = json_file_to_dict(user_info_path)
    result_dict :dict = {'success' : False}
    if user_info_dict==[]:
        return result_dict
    new_user_id = new_user_info['id']
    new_user_passwd = new_user_info['password']

    for info in user_info_dict:
        if new_user_id == info['id']:
            if new_user_passwd == info['password']:
                result_dict["success"] = True
    return result_dict

"""
user_id, favorite_lst=[]

user_info.json
{
 id:
 pw:
 name:
 favorite : [ ]
}

reply
{
	success: true/false
}

"""

"""
edit_item_dict={id: ,name: , favorite:[]}

user_info.json
{
 id:
 pw:
 name:
 favorite : [ ]
}

reply
{
	success: true/false
}

"""
def edit_user(edit_item_dict:dict):
    user_info_dict = json_file_to_dict(user_info_path)
    if user_info_dict==[]:
        return {'success':False}
    result_dict={'success':False}
    for i in range(0,len(user_info_dict)+1):
        if user_info_dict[i]['id']==edit_item_dict['id']:
            user_info_dict[i]['name']=edit_item_dict['name']
            user_info_dict[i]['favorite']=edit_item_dict['favorite']
            break
    result_dict.update({'success' : True})
    dict_to_json_file(user_info_path, user_info_dict)
    return result_dict

"""
user_id

user_info.json
{
 id:
 pw:
 name:
 favorite : [ ]
}

reply
{
 id:
 name:
 favorite : [ ]
}

"""
def get_my_page(user_id):
    user_info_dict = json_file_to_dict(user_info_path)
    if user_info_dict==[]:
        return {'success':False}
    
    result_dict={'success':False}
    if user_info_dict==None:
        return result_dict
    for i in range(0,len(user_info_dict)+1):
        if user_info_dict[i]['id']==user_id:
            break
    result_dict.update({'success' : True,
        'id':user_info_dict[i]['id'],
        'name':user_info_dict[i]['name'],
        'favorite':user_info_dict[i]['favorite']
    })
    return result_dict