from flask import Flask, request
from flask_restful import Api, Resource, reqparse
import os
import json
import random, string
from custos.clients.user_management_client import UserManagementClient
from custos.clients.group_management_client import GroupManagementClient
from custos.clients.resource_secret_management_client import ResourceSecretManagementClient
from custos.clients.sharing_management_client import SharingManagementClient
from custos.clients.identity_management_client import IdentityManagementClient

from custos.transport.settings import CustosServerClientSettings
import custos.clients.utils.utilities as utl

from google.protobuf.json_format import MessageToJson, MessageToDict

name = ["shasjain@iu.edu"]
alphabet = string.ascii_letters + string.digits

try:
    # read settings
    custos_settings = CustosServerClientSettings(custos_host='custos.scigap.org',
                                                 custos_port='31499',
                                                 custos_client_id='custos-ugnkmpsqm0rxtozg8oax-10003423',
                                                 custos_client_sec='12N65hZuV4AjNnC1tQeb29c8Q2LQhPootjOjKTet')

    # create custos user management client
    user_management_client = UserManagementClient(custos_settings)

    # create custos group management client
    group_management_client = GroupManagementClient(custos_settings)

    # create custos resource secret client
    resource_secret_client = ResourceSecretManagementClient(custos_settings)

    # create sharing management client
    sharing_management_client = SharingManagementClient(custos_settings)

    # create identity management client
    identity_management_client = IdentityManagementClient(custos_settings)

    # obtain base 64 encoded token for tenant
    b64_encoded_custos_token = utl.get_token(custos_settings=custos_settings)

    created_groups = {}

    admin_user_name = 'shasjain@iu.edu'
    admin_password = 'endurance123@'

    resource_ids = []
    print("Successfully configured all custos clients")

except Exception as e:
    raise e
    print("Custos Id and Secret may wrong " + str(e))

app = Flask(__name__)
api = Api(app)

# @app.route('/')
# def hello_world():  # put application's code here
#     return 'Hello World!'
#
#
# @app.route('/check_active/username:', method='Get')
# def get_user_info(username, password):  # put application's code here
#     return 'Hello World!'


# user_put_args = reqparse.RequestParser()
# user_put_args.add_argument("first_name", type=str, help="First Name is required", required=True)
# user_put_args.add_argument("last_name", type=str, help="Last Name is required", required=True)
# user_put_args.add_argument("password", type=str, help="password is required", required=True)
# user_put_args.add_argument("email", type=str)

user_upt_put_args = reqparse.RequestParser()
user_upt_put_args.add_argument("firstName", type=str, help="First Name is required")
user_upt_put_args.add_argument("lastName", type=str, help="Last Name is required")
user_upt_put_args.add_argument("email", type=str)

group_put_args = reqparse.RequestParser()
group_put_args.add_argument("description", type=str)
group_put_args.add_argument("owner_id", type=str, help="Owner id is required", required=True)

user_get_args = reqparse.RequestParser()
user_get_args.add_argument("password", type=str, help="password is required", required=True)


class User(Resource):

    def get(self):

        response = MessageToJson(user_management_client.find_users(token=b64_encoded_custos_token, offset=0, limit=1))
        return response

    def put(self):
        username = ''.join(random.choice(alphabet) for i in range(10))
        first_name = username
        last_name = ''.join(random.choice(alphabet) for i in range(10))
        password = ''.join(random.choice(alphabet) for i in range(10))
        email = ''.join(random.choice(alphabet) for i in range(6)) + "@gmail.com"
        try:
            user_management_client.register_user(token=b64_encoded_custos_token,
                                                 username=username,
                                                 first_name=first_name,
                                                 last_name=last_name,
                                                 password=password,
                                                 email=email,
                                                 is_temp_password=False)
            user_management_client.enable_user(token=b64_encoded_custos_token, username=username)
            group_management_client.add_user_to_group(token=b64_encoded_custos_token,
                                                      username=username,
                                                      group_id="neo_group_411af813-bebb-4f2e-b7d7-d105d0b383d0",
                                                      membership_type='Member'
                                                      )
            sharing_management_client.share_entity_with_users(token=b64_encoded_custos_token,
                                                              client_id=custos_settings.CUSTOS_CLIENT_ID,
                                                              entity_id="Ineo_api_testYneo_api_testmneo_api_testSneo_api_testj",
                                                              permission_type="READ",
                                                              user_id=username
                                                              )

        except Exception as e:
            return {"status": "User may be already exist" + str(e)}, 404
        return {"status": "User created {}".format(username)}, 201


class UserUpdate(Resource):

    def put(self, username):
        response = MessageToDict(user_management_client.find_users(token=b64_encoded_custos_token, offset=0, limit=1,
                                                                   username=username))
        print(response)
        args = response['users'][0]
        arg_upt = user_upt_put_args.parse_args()
        for key in args:
            if arg_upt.get(key):
                args[key] = arg_upt[key]

        try:
            user_management_client.update_user_profile(token=b64_encoded_custos_token,
                                                       username=username,
                                                       first_name=args['firstName'],
                                                       last_name=args['lastName'],
                                                       email=args['email'])
        except Exception as e:
            return {"status": "User may be already exist " + str(e)}, 404
        return {"status": "User updated"}, 201


class CreateGroup(Resource):
    def put(self, group_name):
        arg = group_put_args.parse_args()

        grResponse = group_management_client.create_group(token=b64_encoded_custos_token,
                                                          name=group_name,
                                                          description=arg['description'],
                                                          owner_id=arg['owner_id'])
        resp = MessageToJson(grResponse)
        return resp


class UserGroup(Resource):
    def put(self, username, group_id):
        val = group_management_client.add_user_to_group(token=b64_encoded_custos_token,
                                                        username=username,
                                                        group_id=group_id,
                                                        membership_type='Member'
                                                        )
        resp = MessageToJson(val)


class GetUsers(Resource):
    def get(self, count):
        val = user_management_client.find_users(token=b64_encoded_custos_token, offset=0, limit=count)
        resp = MessageToJson(val)
        return resp


api.add_resource(User, "/user")
api.add_resource(UserUpdate, "/userupdate/<string:username>")
api.add_resource(CreateGroup, "/group/<string:group_name>")
api.add_resource(UserGroup, "/usergroup/<string:username>/<string:group_id>")
api.add_resource(GetUsers, "/getusers/<int:count>")

if __name__ == '__main__':
    os.environ['FLASK_ENV'] = 'development'
    app.run(debug=False)
