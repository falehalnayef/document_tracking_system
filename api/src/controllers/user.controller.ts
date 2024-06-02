import { ValidationError } from "sequelize";
import { NextFunction, Response } from "express";
import { successfulResponse } from "../utils/responseMessage.js";
import { IUserService } from "../interfaces/business_interfaces/user.interfaces.js";
import AuthenticatedRequest from "../interfaces/utility_interfaces/request.interface.js";
class UserController {
  private userServices: IUserService;

  constructor(userServices: IUserService) {
    this.userServices = userServices;
  }

  async createUser(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userName, email, password } = req.body;

      const user = await this.userServices.register(userName, email, password);

      res
        .status(201)
        .send(successfulResponse("Account is created.", user.display));
    } catch (error: any) {
      if (
        error instanceof ValidationError ||
        error.name === "SequelizeDatabaseError"
      )
        error.statusCode = 400;

      next(error);
    }
  }

  async login(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await this.userServices.login(email, password);

      res.status(200).send(successfulResponse("Logged in", user.display()));
    } catch (error: any) {
      next(error);
    }
  }

  async getAllUsers(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await this.userServices.getAllUsers();

      res.status(200).send(successfulResponse("Users", users));
    } catch (error: any) {
      next(error);
    }
  }

  async showUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);

      const user = await this.userServices.showUser(userId);

      res.status(200).send(successfulResponse("User", user));
    } catch (error: any) {
      next(error);
    }
  }
}

export default UserController;
