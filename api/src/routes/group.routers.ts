import { Router } from "express";
import GroupController from "../controllers/gruop.controller.js";


class GroupRouter {


    public router: Router;
    private groupController: GroupController;


    constructor(router: Router, groupController: GroupController){

        this.router = router;
        this.groupController = groupController;
        this.initializeRoutes();
        this
    }

    private initializeRoutes(): void {
        this.router.post("/membership", this.groupController.joinGroup.bind(this.groupController))
        this.router.post("/", this.groupController.createGroup.bind(this.groupController));
        this.router.get("/ownership", this.groupController.getMyGroupsAsOwner.bind(this.groupController));
        this.router.get("/membership", this.groupController.getMyGroupsAsMember.bind(this.groupController));
        this.router.post("/users", this.groupController.addUserToGroup.bind(this.groupController));
        this.router.delete("/:group_id", this.groupController.deleteGroup.bind(this.groupController));
        this.router.get("/:group_id", this.groupController.getGroup.bind(this.groupController));
        this.router.delete("/:group_id/users/:user_id", this.groupController.deleteUserFromGroup.bind(this.groupController));
        this.router.delete("/:group_id/membership", this.groupController.leaveGroup.bind(this.groupController));
    }
}


export default GroupRouter;
