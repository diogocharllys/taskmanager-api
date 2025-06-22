import "express";
import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: Pick<User, 'id' | 'name' | 'email'>
    }
  }
}
