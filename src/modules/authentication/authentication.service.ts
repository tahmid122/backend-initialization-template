import { User } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import transporter from "../../utils/transporter";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
const register = async (data: Pick<User, "name" | "email" | "password">) => {
  const userAlready = await prisma.user.findFirst({
    where: { email: data.email },
  });
  if (userAlready) {
    throw new AppError("User already exist. Please login to continue");
  }
  const hashPassword = await bcrypt.hash(data.password, 10);
  const createdUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (createdUser) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const hashOtp = await bcrypt.hash(otp, 10);

    //delete previous otp
    await prisma.oTP.deleteMany({
      where: {
        email: createdUser.email,
      },
    });
    await prisma.oTP.create({
      data: {
        email: createdUser.email,
        expiresAt,
        otp: hashOtp,
        purpose: "REGISTER",
      },
    });

    try {
      const info = await transporter.sendMail({
        from: '"Backend Initialization Team" <mdtahmidalam.work@gmail.com>',
        to: createdUser.email,
        subject: "Account verification code",
        text: "Account verification code",
        html: `<b>Verification code is ${otp}</b>`,
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
      console.error("Error while sending mail:", err);
    }
  }
  return createdUser;
};

const verifyAccount = async (data: { otp: string; email: string }) => {
  const otpRecord = await prisma.oTP.findFirst({
    where: {
      email: data.email,
      purpose: "REGISTER",
      isUsed: false,
    },
  });
  if (!otpRecord) {
    throw new AppError("Invalid OTP", 400);
  }
  if (otpRecord.expiresAt < new Date()) {
    throw new AppError("OTP has expired.", 400);
  }
  const isMatch = await bcrypt.compare(data.otp, otpRecord.otp);
  if (!isMatch) {
    throw new AppError("Invalid OTP", 400);
  }

  await prisma.oTP.update({
    where: { id: otpRecord.id },
    data: {
      isUsed: true,
    },
  });
  await prisma.user.update({
    where: { email: data.email },
    data: {
      isVerified: true,
    },
  });
  await prisma.oTP.deleteMany({
    where: {
      email: data.email,
      isUsed: true,
    },
  });
  return { message: "Account verified successfully" };
};

const resendVerificationEmail = async (data: { email: string }) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const hashOtp = await bcrypt.hash(otp, 10);

  //delete previous otp
  await prisma.oTP.deleteMany({
    where: {
      email: data.email,
      purpose: "REGISTER",
    },
  });
  await prisma.oTP.create({
    data: {
      email: data.email,
      expiresAt,
      otp: hashOtp,
      purpose: "REGISTER",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Backend Initialization Team" <mdtahmidalam.work@gmail.com>',
      to: data.email,
      subject: "Account verification code",
      text: "Account verification code",
      html: `<b>Verification code is ${otp}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
  return { message: "Rent the verification email." };
};

const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new AppError("Invalid credentials.", 400);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials.", 400);
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.JWT_SECRET as string,
  );
  const { password: userPassword, ...others } = user;

  return {
    success: true,
    message: "Login successful.",
    data: { user: others, token },
  };
};

export const authenticationService = {
  register,
  verifyAccount,
  resendVerificationEmail,
  login,
};
