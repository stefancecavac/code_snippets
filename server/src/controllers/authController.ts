import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import client from "../db/prismaClient";

const getCurrentUser = async (req: Request, res: Response) => {
  const { id } = req.user;

  try {
    const user = await client.user.findUnique({
      where: {
        id: id,
      },
    });

    res.status(201).json({ username: user?.username, userId: user?.id, email: user?.email, reputation: user?.reputation });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fileds must be required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "not a valid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "not a strong password" });
  }

  try {
    const userNameExists = await client.user.findFirst({
      where: {
        username: username,
      },
    });
    if (userNameExists) {
      return res.status(400).json({ message: "User with that username already exists" });
    }

    const emailExists = await client.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return res.status(400).json({ message: "User with that email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await client.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 86400000,
    });

    res.status(201).json({ message: "User successfuly registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fileds must be required" });
  }

  try {
    const user = await client.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 86400000,
    });

    res.status(201).json({ message: "User successfuly Logined" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(201).json({ message: "User successfuly loged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { registerUser, loginUser, logoutUser, getCurrentUser };
