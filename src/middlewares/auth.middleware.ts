import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma/client"; 

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const token = authHeader ? authHeader.split(" ")[1] : undefined;
  try {
    if (!token) {
      res.status(401).json({ message: "Token não fornecido" });
      return;
    }

    const payload = jwt.verify(token, JWT_SECRET) as { sub: string };

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      res.status(401).json({ message: "Usuário não encontrado" });
      return;
    }

    req.user = { id: user.id, name: user.name, email: user.email };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
    return;
  }
};
