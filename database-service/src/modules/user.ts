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

        if(!!user) {
            return {status: true}
        }
        else {
            return {status: false};
        }
    } catch (err) {
        return {status: false};
    }
}