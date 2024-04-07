import { Router } from "express";
import userRouter from "./user.routers";
import groupRouter from "./group.routers";
import UserAuth from "../middlewares/authMiddleware/user.auth";


class IndexRouter {

    public router: Router;
    private userAuth: UserAuth;

    constructor() {
        this.router = Router();
        this.userAuth = new UserAuth();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use("/users", userRouter);
        this.router.use("/groups", this.userAuth.checkUser, groupRouter);
    }

}

export default new IndexRouter().router;
