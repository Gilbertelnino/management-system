import { User } from "../database/models";
import { onError } from "../utils/response";

class UserExists{
    
    static async registerExists (req, res, next) {
        // check user if is already an esist
        const emailExist = await User.findOne({ where: { email: req.body.email } });
        if (emailExist) return onError(res, 400, "Email already exist");
        next()
    }
    static async loginExists (req, res, next) {
        // check user if is already an esist
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return onError(res, 401, "Invalid Email or Password");
        next()
    }
}
export default UserExists;