import mongoose from "mongoose";
import {
  comparePassword,
  createJwtToken,
  decryptPassword,
} from "../../utils/controllerUtils.js";
import User from "../models/User.js";

// to handle login process
export const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    let compare = await comparePassword(req.body.password, user.password);
    if (compare) {
      return res.status(201).json({
        data: user,
        token: createJwtToken(
          { _id: user._id, email: user.email },
          process.env.EXPIRED_JWT
        ),
        refresh_token: createJwtToken(
          { _id: user._id, email: user.email },
          process.env.EXPIRED_REFRESH_JWT
        ),
      });
    } else {
      return res.status(401).json({
        error: {
          message: "password not match",
        },
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: {
        message: "user not found",
      },
    });
  }
};
// to register new user\
/**
 * email string
 * password string
 * name string
 */
export const register = async (req, res) => {
  let password = "";
  let body = req.body;
  try {
    password = await decryptPassword(body.password);
  } catch (error) {
    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
  try {
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      ...body,
      password: password,
    });
    const savedUser = await user.save();
    return res.status(201).json({
      data: savedUser,
      token: createJwtToken(
        { _id: savedUser._id, email: savedUser.email },
        process.env.EXPIRED_JWT
      ),
      refresh_token: createJwtToken(
        { _id: savedUser._id, email: savedUser.email },
        process.env.EXPIRED_REFRESH_JWT
      ),
    });
  } catch (error) {
    return res.status(400).json({ error: { message: error.message } });
  }
};
// to tets jwt token
export const test = (req, res) => {
  res.status(200).json({
    message: `user with id ${req.logged._id} passed the middleware`,
  });
};
