import { Request, Response } from "express";
import { User } from "../interfaces/user";
import logger from "../config/logger";
import authErrors from "../errors/auth";
import passwordHasher from "../helpers/password-hasher";
import userService from "../services/user";
import createToken from "../helpers/create-token";
import passwordComparer from "../helpers/password-comparer";

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

        return res.status(400).json({ error: "User email already in use." });
      }

      const token = createToken(registerUser.email);

      logger.debug(`auth/register - ${token}`);

      return res.status(201).json({ token: token });
    } catch (error) {
      logger.error(`auth/register - error ${error}`);

      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const user: User = req.body;

      const errors = authErrors.login(user);

      if (errors != undefined) {
        logger.error(`auth/login - error ${errors}`);

        return res.status(400).json({ error: errors });
      }

      const hashedPassword = await passwordHasher(user.password);

      const userData = {
        email: user.email,
        password: hashedPassword,
      };

      const loginUser = await userService.login(userData);

      if (!loginUser) {
        logger.error(`auth/login - email: ${user.email} not registered yet`);

        return res.status(400).json({ error: "Credencials are invalid." });
      }

      const passwordMatch = await passwordComparer(
        user.password,
        loginUser.password
      );

      if (!passwordMatch) {
        logger.error(`auth/login - password: incorrect`);

        return res.status(400).json({ error: "Credencials are invalid." });
      }

      const token = createToken(loginUser.email);

      logger.debug(`auth/login - ${token}`);

      return res.status(200).json({ token: token });
    } catch (error) {
      logger.error(`auth/login - error ${error}`);

      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default authController;
