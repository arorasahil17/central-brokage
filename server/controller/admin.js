import { asyncHandler } from "../middleware/error.js";
import Admin from "../model/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secureConnection: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const adminSign = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    const error = new Error("Please enter all details");
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  let admin = new Admin({
    email: email,
    username: username,
    password: hashedPassword,
  });
  const savedAdmin = await admin.save();
  res.status(200).json({ status: true, savedAdmin });
});

const adminLogin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const error = new Error("Please enter username and password");
    return next(error);
  }
  const admin = await Admin.findOne({ username });
  if (!admin) {
    const error = new Error("No existing admin found with this username");
    error.statusCode = 400;
    next(error);
    return;
  }
  const isMatched = await bcrypt.compare(password, admin.password);
  if (!isMatched) {
    const error = new Error("Incorrect Password");
    return next(error);
  }
  //create token
  const token = await jwt.sign({ admin: admin._id }, process.env.JWT_SECRET);
  admin.token = token;
  await admin.save();
  res
    .cookie("adminToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 10000),
    })
    .status(200)
    .json({ status: true, message: "Login Successfull", admin: admin });
});

const adminAuthenticate = asyncHandler(async (req, res, next) => {
  const id = req.adminId;
  const admin = await Admin.findById(id);
  res.status(200).json({ status: true, admin });
});

const adminPasswordReset = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    const error = new Error("No admin found with this email");
    error.statusCode = 500;
    next(error);
    return;
  }
  const resetToken = await jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
  admin.resetPasswordToken = resetToken;
  await admin.save();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: admin.email,
    subject: "Reset Password",
    html: `To Reset the password click on the link below. This link is valid for 10 minutes.\n<a href='https://centralbrokerage.net/password-change/${resetToken}'>Click Here</a>`,
  };
  await transporter.sendMail(mailOptions);
  res.status(200).json({
    status: true,
    message:
      "We have sent you reset password link on your. Reset your password through that link.",
  });
});

const adminPasswordChange = asyncHandler(async (req, res, next) => {
  const { token } = req.query;
  const { newPassword } = req.body;
  if (!newPassword) {
    const error = new Error("Please provide the new password");
    error.statusCode = 400;
    next(error);
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    const error = new Error("The reset password link is expired");
    error.statusCode = 498;
    next(error);
    return;
  }
  const admin = await Admin.findOne({ resetPasswordToken: token });
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  admin.password = hashedPassword;
  admin.resetPasswordToken = null;
  await admin.save();
  res
    .status(200)
    .json({ status: true, message: "Password Reset Successfully!" });
});

export {
  adminSign,
  adminLogin,
  adminAuthenticate,
  adminPasswordReset,
  adminPasswordChange,
};
