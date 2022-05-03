import requests

BASE = "http://127.0.0.1:5000/"

# response = requests.get(BASE+"user/shasjain@iu.edu")
# print(response.json())
#

# response = requests.put(BASE+"user/nemo", {
#     'first_name': 'Nemo',
#     'last_name': 'finding',
#     'password': '12345678',
#     'email': 'finding nemo@gmail.com'
# })
#
# print(response.json())



# response = requests.put(BASE+"userupdate/abelota", {
#     'firstName': 'naap',
#     'lastName': 'tola'
# })
#
# print(response.json())


# response = requests.put(BASE+"group/neo_group", {
#     'description': 'test description',
#     'owner_id': 'shasjain@iu.edu'
# })
#
# print(response.json())


response = requests.put(BASE+"usergroup/alice/neo_group")

print(response.json())

