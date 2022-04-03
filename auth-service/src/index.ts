import { getClient, checkUser, getAuth2Client, authenticateUser } from "./modules/user";

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const settings = {
    protoFile: "auth.proto",
    serviceIP: "0.0.0.0",
    servicePort: "43000"
}

const packageDefinition = protoLoader.loadSync(
    `${__dirname}/${settings.protoFile}`, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const authProto: any = grpc.loadPackageDefinition(packageDefinition);

const userRegisterClient = getClient();
const auth2Client = getAuth2Client();

async function authUser(input, cb) {
    try{
        const authResponse =  await checkUser(input.request, userRegisterClient, auth2Client);
        console.log("authResponse", authResponse)
        cb(null, authResponse);
    } catch(error){
        console.log(error)
        cb(error, {isAuth: false});
    }
}

async function loginUser(input, cb) {
    try{
        const loginResponse =  await authenticateUser(input.request, userRegisterClient, auth2Client);
        console.log("loginResponse", loginResponse)
        cb(null, loginResponse);
    } catch(error){
        console.log("error",error)
        cb(error, {isAuth: false});
    }
}

const authServer = {
    authUser,
    loginUser
};

function init() {
    const server: any = new grpc.Server();
    server.addService(
        authProto.auth.Auth.service,
        authServer
    );
    server.bindAsync(
        `${settings.serviceIP}:${settings.servicePort}`,
        grpc.ServerCredentials.createInsecure(),
        () => {
            console.log("Auth Service Started");
            server.start();
        }
    )
}

init();