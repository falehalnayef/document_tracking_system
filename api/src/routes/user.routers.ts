import { Router } from "express";
import UserController from "../controllers/user.controller.js";

class UserRouter {
    public router: Router;
    private userController: UserController;

    constructor(userController: UserController) {
        this.router = Router();
        this.userController = userController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/registration", this.userController.createUser.bind(this.userController));
        this.router.post("/login", this.userController.login.bind(this.userController));
    }
}

export default UserRouter;
