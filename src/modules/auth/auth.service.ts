import { prisma } from "../../lib/prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const AuthService = {
  async register(name: string, email: string, password: string): Promise<User> {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("Email já cadastrado");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return user;
  },

  async login(
    email: string,
    password: string
  ): Promise<User | { token: string }> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Credenciais inválidas");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Credenciais inválidas");

    const token = jwt.sign({ sub: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { token };
  },
};
