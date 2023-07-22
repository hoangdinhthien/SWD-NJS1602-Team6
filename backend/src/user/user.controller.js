import createHttpError from "http-errors";
import user from "./user.model.js";
import bcrypt from "bcrypt";
import twilio from "twilio";
import redisClient from "../config/redis.js";
import mongoose from "mongoose";

export async function register(req, res, next) {
  try {
    const { phone, password, name, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      name,
      phone,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "register successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      throw createHttpError.BadRequest();
    }
    const checkPhone = await user.findOne({ phone });
    if (!checkPhone) {
      throw createHttpError.NotFound("wrong phone");
    }
    const checkPassword = await bcrypt.compare(password, checkPhone.password);
    if (!checkPassword) {
      throw createHttpError.NotFound("wrong password");
    }
    res.status(200).json(checkPhone);
  } catch (error) {
    next(error);
  }
}

export async function otp(req, res, next) {
  try {
    const { type } = req.query;
    if (type === undefined) {
      const { phone } = req.body;
      const checkUser = await user.findOne({ phone });
      if (checkUser) {
        throw createHttpError.Conflict("phone is already exits");
      }
    }
    const accountSid = "AC939633cb6121a8ce0583f2979c7e9522";
    const authToken = "7b2018fbf7a1bf830cf271c99944a688";
    const client = twilio(accountSid, authToken);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = `Your otp is: ${otp}`;
    await client.messages.create({
      body: message,
      from: "+14067977938",
      to: "+84378301007",
    });

    await redisClient.set("otp", otp, {
      EX: 90,
    });
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function verify(req, res, next) {
  try {
    const { otp } = req.body;
    if (!otp) {
      throw createHttpError.BadRequest();
    }

    const redisOtp = await redisClient.get("otp");
    if (!redisOtp) {
      throw createHttpError.BadRequest("otp expired");
    }
    if (otp !== redisOtp) {
      throw createHttpError.BadRequest("otp wrong");
    }

    await redisClient.del("otp");
    res.status(200).json({ message: "veify successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getStaffs(req, res, next) {
  try {
    const listStaff = await user.find({ role: "staff" });
    res.status(200).json(listStaff);
  } catch (error) {
    next(error);
  }
}

export async function deleteStaff(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      throw createHttpError.BadRequest();
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError.NotFound("not found id");
    }
    const deleteStaff = await user.findByIdAndDelete(id);
    if (!deleteStaff) {
      throw createHttpError.NotFound("not found staff");
    }
    res.status(200).json({ message: "delete sucessfully" });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { password, phone } = req.body;
    if (!password || !phone) {
      throw createHttpError.BadRequest();
    }
    const checkUser = await user.findOne({ phone });
    if (!checkUser) {
      throw createHttpError.NotFound("not found user");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    checkUser.password = hashedPassword;
    await checkUser.save();
    res.status(200).json({ message: "password change successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
