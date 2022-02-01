import User from "../model/user.model";

export function saveUser({name, photoURL, tokenId, email}) {
    try {
        const newUser = new User({
            name,
            photoURL,
            tokenId,
            email
        });

        return newUser.save()
        .then(() => {
            return new Promise(resolve => {
                resolve(true);
            })
        })
        .catch(err => {
            return new Promise(resolve => {
                resolve(false);
            })
        })
    } catch (err) {
        return new Promise(resolve => {
            resolve(false);
        })
    }
}