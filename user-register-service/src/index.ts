import { getClient, saveUser } from "./modules/user";

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const settings = {
    protoFile: "user-register.proto",
    serviceIP: "localhost",
    servicePort: "42000"
}

const packageDefinition = protoLoader.loadSync(
    `${__dirname}/${settings.protoFile}`, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const userRegisterProto: any = grpc.loadPackageDefinition(packageDefinition);

const databaseClient = getClient();

async function registerUser(input, cb) {
    try{
        const userResponse =  await saveUser(input.request, databaseClient);
        cb(null, userResponse);
    } catch(error){
        cb(error, {status: false});
    }
}

const userRegisterServer = {
    registerUser
};

function init() {
    const server: any = new grpc.Server();
    server.addService(
        userRegisterProto.user.UserRegister.service,
        userRegisterServer
    );
    server.bindAsync(
        `${settings.serviceIP}:${settings.servicePort}`,
        grpc.ServerCredentials.createInsecure(),
        () => {
            console.log("User Register Service Started");
            server.start();
        }
    )
}

init();