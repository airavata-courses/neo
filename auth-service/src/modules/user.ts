const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const {OAuth2Client} = require("google-auth-library");

const settings = {
    protoFile: "user-register.proto",
    serviceIP: "localhost",
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
    try{
        const ticket = await auth2Client.verifyIdToken({
            idToken,
            audience: settings.CLIENT_ID
        });

        const payload = ticket.getPayload();

        if (!payload['sub']){
            return {
                isAuth: false
            };
        }

        return {...ticket.getPayload(), isAuth: true};
    }
    catch(error) {
        return {isAuth: false};
    }
}

export const authenticateUser = async ({tokenId}, client, auth2Client) => {
    try {
        if(!client) {
            client = getClient();
        }
    
        if(!auth2Client) {
            auth2Client = getAuth2Client();
        }
    
        const payload = await checkToken(auth2Client, tokenId)

        if (!payload['isAuth']) {
            return payload
        }

        const user =  {
            name: payload["name"],
            photoURL: payload["picture"],
            email: payload["email"],
            tokenId
        }

        const {status} = await client.registerUser(user)

        if (!status) {
            return {
                isAuth: false
            }
        }

        return {
            ...user,
            accessToken: tokenId,
            isAuth: true
        }
    } catch(error) {
        return {
            isAuth: false
        }
    }
}

export const checkUser = async ({accessToken}, client, auth2Client) => {
    try {
        if(!client) {
            client = getClient();
        }
    
        if(!auth2Client) {
            auth2Client = getAuth2Client();
        }
    
        const payload = await checkToken(auth2Client, accessToken)

        if (!payload['isAuth']) {
            return {
                isAuth: false
            }
        }

        return {
            isAuth: true
        }
    } catch(error) {
        return {
            isAuth: false
        }
    }
}