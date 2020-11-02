import jwt from "jsonwebtoken";
import { User } from "../database/models";
import { onError} from "../utils/response";
import client from '../helpers/redis_config'

export const verifyAccessToken = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return onError(res, 401, 'Unauthorized');
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userExists = await User.findOne({
      where: { email: verified.payload.email }
    });
    client.get(verified.payload.id, (err, val) => {
      if (userExists) {
        if (val === token) {
          req.user = userExists;
          return next();
        }
        return onError(res, 401, 'User already logged out, Please Login and try again!');
      }
    });
  } catch (error) {
    return onError(res, 500, 'Internal server error');
  }
};
// generate token function
export const generateToken = (userinfo) => {
  try {
    const payload = {
      id: userinfo.id,
      firstName: userinfo.firstName,
      lastName: userinfo.lastName,
      email: userinfo.email,
      password: userinfo.password,
    }
    const token = jwt.sign({payload:payload}, process.env.TOKEN_SECRET_KEY,{ expiresIn: '1h' });
    return token
  } catch (error) {
    return error
  }
    
}

// Check if user is verified or not function

export const isNotVerified = async (req, res, next)=>{
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return onError(res,400,"User doesn't exist! If you have been registered, Please check you email to verify your account!")
    }
    else if (user.isVerified) {
      return next()
    } else {
      return onError(res,401,'Your account has not been verified,Please check your email to Verify you email to continue!')
    }
  } catch (error) {
    console.log(error)
    return onError(res,500,'Internal server error')
  }
  
}
