import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import signAccessToken from '../helpers/jwt-helper';
import { generateToken} from "../middlewares/verifyToken";
import {passwordResetURL,emailVerifytURL,resetPasswordTemplate} from '../helpers/getEmail'
import { User } from "../database/models";
import client from '../helpers/redis_config';
import { onError, onSuccess } from "../utils/response";

class Users {
  // get users
  static async getUsers(req, res) {
    try {
      const users = await User.findAll();
      if (users.length === 0) {
          return onError(res,404,'Not User yet!')
        } else {
          return onSuccess(res,200,'All users Fetched Successfully',users)
      }
  } catch (error) {
      return onError(res,500,'Internal server error')
  }
  }
// register user
  static async registerUser(req, res) {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isVerified: false
      };
      const token = generateToken(user);
      const url = emailVerifytURL(token);
      resetPasswordTemplate(user, url, 'Verify you email to continue! Note: This email is only valid for 1 hour!');
      return onSuccess(res, 200, `Hello, ${user.firstName} You have successfully signup, Check a verification link in your email . Note: email will be expired in 1 hour`);
    } catch (error) {
      return onError(res,500,'internal server error')
    }
  }

  // create user after verification
  static async verifyUser(req, res) {

      try {
        // decode jwt from Url
        const userToken = req.query.token;

        const userInfo = jwt.decode(userToken, process.env.TOKEN_SECRET_KEY);

        // distructuring user info
        const {firstName,lastName,email,password} = userInfo.payload
      // check user if is already an exist
      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) return onError(res, 400, `Hi, ${firstName} your account is already Verified!`);

      // Hash passwords

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
        
      const newuser = await User.create({
        isVerified: true,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
        await newuser.save()
        signAccessToken(newuser);
      return onSuccess(res, 201, `You are Welcome ${newuser.firstName}! your account have been verified successfully, now you can login`);
    } catch (err) {
      console.log(err)
      return onError(res, 500, "Internal Server error");
    }
  }
// confirm email

  static async loginUser(req, res) {

    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return onError(res, 401, "Invalid Email or Password");

  
    const token = await signAccessToken(user)
    
    return res.json({
      accessToken: token,
      message: "You Logged in successfully",
    });
  }
  static async logout(req, res) {
    try {
      const token = req.header('auth-token');
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
       const userId = verified.payload.id
      client.del(userId);
      return onSuccess(res, 200, `${req.user.name} you logged out successfully.`);
      
    } catch (error) {
      return onError(res,500,"Internal server error")
    }
  }
  static async deleteUser(req, res) {
    const user = await User.findOne({ where: { id: req.params.id } });

    try {
      if (!user)
        return onError(res, 404, "user you are trying to delete doesn't exist");
      else {
        await user.destroy();
        return onSuccess(res, 200, "user deleted successfully");
      }
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }
}
export default Users;
