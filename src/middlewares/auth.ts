import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../prisma/generated/prisma/enums";
import jwt from "jsonwebtoken";
import config from "../config";
export interface JWT_USER {
  id: string;
  email: string;
  role: UserRole;
}
declare global {
  namespace Express {
    interface Request {
      user?: JWT_USER;
    }
  }
}

const auth = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    let decoded: jwt.JwtPayload;

    try {
      decoded = jwt.verify(
        token,
        config.JWT_SECRET as string,
      ) as jwt.JwtPayload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    if (
      typeof decoded.id !== "string" ||
      typeof decoded.email !== "string" ||
      !Object.values(UserRole).includes(decoded.role)
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
    }
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role as UserRole,
    };

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access.",
      });
    }

    next();
  };
};

export default auth;
