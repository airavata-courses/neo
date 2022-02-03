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

    const database = grpc.loadPackageDefinition(packageDefinition);
    return new database.db.Database(`${settings.serviceIP}:${settings.servicePort}`, grpc.credentials.createInsecure());
}

export const saveUser = async ({name, photoURL, tokenId, email}, client) => {
    try {
        if(!client) {
            client = getClient();
        }
    
        return await client.saveUser({name, photoURL, tokenId, email});
    } catch(error) {
        return {
            status: false
        }
    }
};
