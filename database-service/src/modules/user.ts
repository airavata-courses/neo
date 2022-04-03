import User from "../model/user.model";

export async function saveUser({name, photoURL, tokenId, email}) {
    try {
        const newUser = {
            name,
            photoURL,
            tokenId,
            email
        };

        await User.findOneAndUpdate({email}, {$set: newUser}, {upsert: true});
        return {status: true}
    } catch (err) {
        console.log(err)
        return {status: false};
    }
}