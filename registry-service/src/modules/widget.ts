const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const settings = {
    protoFile: "database.proto",
    serviceIP: "localhost",
    servicePort: "40000"
}

export const getClient = () => {
    const packageDefinition = protoLoader.loadSync(
        `${__dirname}/../${settings.protoFile}`,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        }
    );

    const session = grpc.loadPackageDefinition(packageDefinition);
    return new session.db.Database(`${settings.serviceIP}:${settings.servicePort}`, grpc.credentials.createInsecure());
}

export const fetchHistory = ({page, email}, client) => {
    if(!client) {
        client = getClient();
    }

    return new Promise((resolve,reject) => {
        client.showHistory({page, email}, (error, response) => {
            if (error) {
                reject(error)
            }
            if (response.history === 'failed') {
                reject('failed');
            }
            resolve(response);
        });
    })
}

export const saveWidget = async ({station, feature, date, email}, client) => {
    if(!client) {
        client = getClient();
    }

    return new Promise((resolve,reject) => {
        client.saveWidget({station, feature, date, email}, (error, response) => {
            if (error) {
                reject(error)
            }
            resolve(response);
        });
    });
}