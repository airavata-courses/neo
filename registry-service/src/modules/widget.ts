const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const settings = {
    protoFile: "database.proto",
    serviceIP: "0.0.0.0",
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
    
        if (!email) {
            return {exist: false}
        }
        const req = {email}
        if (!!page) {
            req["page"] = page
        }
        return await new Promise((resolve, reject) => {
            client.showHistory(req, (error, response) => {
                if(error) {
                    resolve({exist: false})
                }
                if(response) {
                    if(!response.exist){
                        resolve({exist: false})
                    }
                    resolve(response)
                }
                resolve({exist: false})
            });
        });
    } catch(error) {
        console.error()
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

        if (!station || !feature || !date || !email) {
            return {
                status: false
            }
        }
    
        return await new Promise((resolve,reject) => {
            client.saveWidget({station, feature, date, email}, (error, response) => {
                if (error) {
                    resolve({
                        status:false
                    });
                }

                if(response) {
                    if(!response.status) {
                        resolve({
                            status: false
                        })
                    }
                    resolve({
                        status: true
                    })
                }
                resolve({
                    status: false
                })
            });
        });
    } catch(error) {
        console.log(error)
        return {
            status: false
        }
    }
}