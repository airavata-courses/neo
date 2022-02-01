const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
import { saveUser } from './modules/user';
import { addWidget, showHistory } from './modules/widget';

const settings = {
    protoFile: "database.proto",
    serviceIP: "localhost",
    servicePort: "40000"
}

const packageDefinition = protoLoader.loadSync(
    `${__dirname}/${settings.protoFile}`, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const databaseProto: any = grpc.loadPackageDefinition(packageDefinition);

async function saveWidget(input, cb) {
    try{
        const widgetResponse = await addWidget(input.request)
        cb(null, widgetResponse);
    } catch(error) {
        cb(error, {status: false});
    }
}

async function getHistory(input, cb) {
    try{
        const historyResponse = await showHistory(input.req)
        cb(null, historyResponse);
    } catch(error) {
        cb(error, {history: 'failed'});
    }
}

async function getUser(input, cb) {
    try{
        const userResponse = await saveUser(input.request)
        cb(null, userResponse);
    } catch(error) {
        cb(error, {status: false});
    }
}

const databaseServer = {
    saveWidget: saveWidget,
    saveUser: getUser,
    showHistory: getHistory
}

function init() {
    const server: any = new grpc.Server();
    server.addService(
        databaseProto.db.Database.service,
        databaseServer
    );
    server.bindAsync(
        `${settings.serviceIP}:${settings.servicePort}`,
        grpc.ServerCredentials.createInsecure(),
        () => {
            console.log("Database Service Started");
            server.start();
        }
    )
}

init();