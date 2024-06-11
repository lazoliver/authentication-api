import { Request, Response } from "express";
import { User } from "../interfaces/user";
import logger from "../config/logger";
import authErrors from "../errors/auth";
import passwordHasher from "../helpers/password-hasher";
import userService from "../services/user";
import createToken from "../helpers/create-token";

const authController = {
  async register(req: Request, res: Response) {
    try {
      const user: User = req.body;

      const errors = authErrors.register(user);

      if (errors != undefined) {
        logger.error(`auth/register - error ${errors}`);

        return res.status(400).json({ error: errors });
      }

      const hashedPassword = await passwordHasher(user.password);

      const userData = {
        email: user.email,
        password: hashedPassword,
      };

      const registerUser = await userService.register(userData);

      if (!registerUser) {
        logger.error(`auth/register - email: ${user.email} already in use`);

        return res.status(422).json({ error: "User email already in use." });
      }

      const token = createToken(registerUser.email);

      logger.debug(`auth/register - ${token}`);

      return res.status(201).json({ token: token });
    } catch (error) {
      logger.error(`auth/register - error ${error}`);

      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default authController;
