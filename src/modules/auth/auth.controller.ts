import { Request, Response } from "express";
import { AuthService } from "../auth/auth.service";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await AuthService.register(name, email, password);
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
    return;
  }
};
