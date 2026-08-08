import { User } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import transporter from "../../utils/transporter";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
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

export const authenticationService = { register };
