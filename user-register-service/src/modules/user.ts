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
    
        return await new Promise((resolve,reject) => {
            client.saveUser({name, photoURL, tokenId, email}, (error, response) => {
                if(error) {
                    console.log("database service error", error)
                    resolve({status: false})
                }
                if(response) {
                    if(!response.status){
                        resolve({status: false})
                    }
                    resolve({status: true})
                }
                resolve({status: false})
            });
        });
    } catch(error) {
        console.log(error)
        return {
            status: false
        }
    }
};
