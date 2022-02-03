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

export const fetchHistory = async ({page, email}, client) => {
    try {
        if(!client) {
            client = getClient();
        }
    
        return await client.showHistory({page, email});
    } catch(error) {
        return {
            exist: false
        }
    }
}

export const saveWidget = async ({station, feature, date, email}, client) => {
    try {
        if(!client) {
            client = getClient();
        }
    
        return await client.saveWidget({station, feature, date, email});
    } catch(error) {
        return {
            status: false
        }
    }
}