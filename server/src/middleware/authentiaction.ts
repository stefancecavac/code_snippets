import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Not authorized no token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);

    if (!decodedToken) {
      return res
        .status(400)
        .json({ message: "Not authorized not valid token" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not authorized something went wrong" });
  }
};

export default authenticate;
