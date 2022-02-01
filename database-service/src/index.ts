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
    cb(null, {
        status: addWidget(input.request)
    });
}

async function getHistory(input, cb) {
    cb(null, {
        history: showHistory(input.req)
    });
}

async function getUser(input, cb) {
    cb(null, {
        status: saveUser(input.request)
    });
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