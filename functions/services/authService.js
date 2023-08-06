import bcrypt from "bcryptjs";
import connectDatabase from "../../database/dbConnect";
import User from "../models/User";
import { generateToken } from "../../util/auth";

export const loginService = async (email, password) => {
  if (!email || !password) {
    return null;
  }
  try {
    connectDatabase();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("user not found");
    }
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (validPassword) {
      const token = generateToken(existingUser);
      if (token) {
        console.log(token);
      } else {
        console.log("No Token");
      }
      const responseBody = {
        user: existingUser,
        token,
      };
      return responseBody;
    } else {
      return "Invalid password";
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signupService = async (
  firstName,
  lastName,
  email,
  password,
  userType
) => {
  connectDatabase();
  if (!firstName || !email || !password || !userType) {
    return "All fields are required!";
  }
  const searchEmail = email.toLowerCase().trim();
  const userAvailable = await User.findOne({ email: searchEmail });
  if (userAvailable && userAvailable.email) {
    return "user already available with this email address!";
  }
  const salt = await bcrypt.genSalt(10);
  const encryptedPw = await bcrypt.hash(password.trim(), salt);
  const newUser = {
    firstName,
    lastName,
    email,
    username: email,
    password: encryptedPw,
    userType,
  };
  try {
    const userCreated = await User.create(newUser);
    return userCreated;
  } catch (error) {
    return error;
  }
};
