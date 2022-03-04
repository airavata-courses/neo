const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { OAuth2Client } = require("google-auth-library");

const settings = {
    protoFile: "user-register.proto",
    serviceIP: "user-register-service",
    servicePort: "42000",
    CLIENT_ID: "778346190675-ta0pn5r045g7h8415dap39buriocgos1.apps.googleusercontent.com"
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

    const userRegister = grpc.loadPackageDefinition(packageDefinition);
    return new userRegister.user.UserRegister(`${settings.serviceIP}:${settings.servicePort}`, grpc.credentials.createInsecure());
}

export const getAuth2Client = () => {
    return new OAuth2Client(settings.CLIENT_ID);
}

const checkToken = async (auth2Client, idToken) => {
    try {
        // const ticket = await auth2Client.verifyIdToken({
        //     idToken,
        //     audience: settings.CLIENT_ID
        // });

        // const payload = ticket.getPayload();

        // if (!payload['sub']) {
        //     return {
        //         isAuth: false
        //     };
        // }

        if(idToken == null) {
            return {
                isAuth: false
            };
        }

        const parts = idToken.split('.');
        if (parts.length === 2){
            const headerBuf = new Buffer(parts[0], 'base64');
            const bodyBuf = new Buffer(parts[1], 'base64');
            const header = JSON.parse(headerBuf.toString());
            const body = JSON.parse(bodyBuf.toString());

            if (!header.typ || header.typ !== 'JWT' || !body.email_verified) {
                return {
                    isAuth: false
                };
            }

            if (body.aud !== settings.CLIENT_ID || body.iss !== 'accounts.google.com') {
                return {
                    isAuth: false
                }
            }

            if (body.exp < (new Date().getTime() + 1) / 1000) {
                return {
                    isAuth: false
                }
            }

            return { ...body, isAuth: true };
        }
        return {
            isAuth: false
        };
    }
    catch (error) {
        console.log(error)
        return { isAuth: false };
    }
}

export const authenticateUser = async ({ tokenId }, client, auth2Client) => {
    try {
        if (!client) {
            client = getClient();
        }

        if (!auth2Client) {
            auth2Client = getAuth2Client();
        }
        const payload = await checkToken(auth2Client, tokenId)

        if (!payload['isAuth']) {
            return payload
        }

        const user = {
            name: payload["name"],
            photoURL: payload["picture"],
            email: payload["email"],
            tokenId
        }

        return await new Promise((resolve, reject) => {
            client.registerUser(user, (error, response) => {
                if (error) {
                    console.log("register-user error", error)
                    resolve({ isAuth: false })
                }

                if (response) {
                    if (!!response.status) {
                        resolve({
                            name: payload["name"],
                            photoURL: payload["picture"],
                            email: payload["email"],
                            accessToken: tokenId,
                            isAuth: true
                        });
                    }
                }

                resolve({ isAuth: false });
            });
        });
    } catch (error) {
        console.log("error", error)
        return {
            isAuth: false
        }
    }
}

export const checkUser = async ({ accessToken }, client, auth2Client) => {
    try {
        if (!client) {
            client = getClient();
        }

        if (!auth2Client) {
            auth2Client = getAuth2Client();
        }

        if (!accessToken) {
            return {
                isAuth: false
            }
        }
        const auth_token = accessToken.split(' ');
        if (auth_token.length < 2) {
            return {
                isAuth: false
            }
        }

        const payload = await checkToken(auth2Client, auth_token[1])

        if (!payload['isAuth']) {
            return {
                isAuth: false
            }
        }

        return {
            isAuth: true
        }
    } catch (error) {
        console.log(error)
        return {
            isAuth: false
        }
    }
}