import { Router } from "express";
import userRouter from "./user.routers";
import groupRouter from "./group.routers";


const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/groups", groupRouter);


export default indexRouter;
