import expressPkg from "express";
import jwtPkg from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt = jwtPkg;

export interface AuthRequest extends expressPkg.Request {
  user?: {
    id: string;
  } & JwtPayload;
}

// middleware function stays the same
export const authMiddleware = (req: AuthRequest, res: expressPkg.Response, next: expressPkg.NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      id: decoded.id as string,
      ...decoded
    };

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};