import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../utils/errors.util";
import { hashPassword, verifyPassword } from "../utils/password.util";
import { generateAccessToken } from "../utils/jwt.util";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new BadRequestError("User already exists");

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res
    .status(201)
    .json({ status: "success", message: "User created successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) throw new NotFoundError("User doesn't exist");

  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) throw new BadRequestError("Invalid password");

  const accessToken = generateAccessToken(user.id);

  res.json({ status: "success", accessToken });
};
