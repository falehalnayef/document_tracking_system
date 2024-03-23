import { Router } from "express";
import UserRouter from "./user.routers";

const indexRouter = Router();

indexRouter.use("/users", UserRouter);

export default indexRouter;
