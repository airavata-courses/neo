import User from "../model/user.model";

export async function saveUser({name, photoURL, tokenId, email}) {
    try {
        const newUser = new User({
            name,
            photoURL,
            tokenId,
            email
        });

        const user = await newUser.save();

        if(user) {
            return new Promise(resolve => {
                resolve({status: true});
            })
        }
        else {
            return new Promise(resolve => {
                resolve({status: false});
            })
        }
    } catch (err) {
        return new Promise(reject => {
            reject(err);
        })
    }
}