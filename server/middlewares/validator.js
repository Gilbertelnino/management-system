import {signupValidation, loginValidation} from '../validator/userValidation'
import { onError} from "../utils/response";

class Validator {
    static signup(req, res, next) {
        const { error } = signupValidation(req.body);
        if (error) return onError(res, 400, error.details[0].message);
        next()
    }
    static login(req, res, next) {
        const { error } = loginValidation(req.body);
        if (error) return onError(res, 400, error.details[0].message);
        next()
    }
}

export default Validator;