import { Router, Request, Response, NextFunction } from "express";
import GroupController from "../controllers/gruop.controller";


class GroupRouter {


    public router: Router;
    private groupController: GroupController;


    constructor(){

        this.router = Router();
        this.groupController = new GroupController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/createGroup", this.createGroup);
        this.router.get("/index", this.getMyGroups);
        this.router.delete("/deleteGroup/:group_id", this.deleteGroup);




    }
    private createGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.createGroup(req, res);

        } catch (error) {
            next(error);
        }
    };

    private getMyGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.getMyGroups(req, res);

        } catch (error) {
            next(error);
        }
    };

    private deleteGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.groupController.deleteGroup(req, res);

        } catch (error) {
            next(error);
        }
    };
}


export default new GroupRouter().router;
