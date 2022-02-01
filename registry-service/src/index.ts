import { fetchHistory, getClient, saveWidget } from "./modules/widget";

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const settings = {
    protoFile: "registry.proto",
    serviceIP: "localhost",
    servicePort: "41000"
}

const packageDefinition = protoLoader.loadSync(
    `${__dirname}/${settings.protoFile}`, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const registryProto: any = grpc.loadPackageDefinition(packageDefinition);

const databaseClient = getClient();

async function registerWidget(input, cb) {
    try{
        const widgetResponse =  await saveWidget(input.request, databaseClient);
        cb(null, widgetResponse);
    } catch(error){
        cb(error, {status: false});
    }
}

function getHistory(input, cb) {
    cb(null, fetchHistory(input.req, databaseClient));
}

const registryServer = {
    registerWidget,
    getHistory
};

function init() {
    const server: any = new grpc.Server();
    server.addService(
        registryProto.registry.Registry.service,
        registryServer
    );
    server.bindAsync(
        `${settings.serviceIP}:${settings.servicePort}`,
        grpc.ServerCredentials.createInsecure(),
        () => {
            console.log("Registry Service Started");
            server.start();
        }
    )
}

init();