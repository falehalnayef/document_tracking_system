import { Router } from "express";
import GroupController from "../controllers/gruop.controller.js";

class GroupRouter {
  public router: Router;
  private groupController: GroupController;

  constructor(groupController: GroupController) {
    this.router = Router();
    this.groupController = groupController;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      this.groupController.createGroup.bind(this.groupController)
    );
    this.router.post(
      "/membership",
      this.groupController.joinGroup.bind(this.groupController)
    );
    this.router.get(
      "/ownership",
      this.groupController.getMyGroupsAsOwner.bind(this.groupController)
    );
    this.router.get(
      "/membership",
      this.groupController.getMyGroupsAsMember.bind(this.groupController)
    );
    this.router.get(
      "/public",
      this.groupController.getPublicGroups.bind(this.groupController)
    );
    this.router.get(
      "/search/:groupName",
      this.groupController.searchForGroup.bind(this.groupController)
    );
    this.router.post(
      "/users",
      this.groupController.addUserToGroup.bind(this.groupController)
    );
    this.router.get(
      "/:groupId/users",
      this.groupController.getUsers.bind(this.groupController)
    );
    this.router.delete(
      "/:groupId",
      this.groupController.deleteGroup.bind(this.groupController)
    );
    this.router.get(
      "/:groupId",
      this.groupController.getGroup.bind(this.groupController)
    );
    this.router.delete(
      "/:groupId/users/:userId",
      this.groupController.removeUserFromGroup.bind(this.groupController)
    );
    this.router.delete(
      "/:groupId/membership",
      this.groupController.leaveGroup.bind(this.groupController)
    );
  }
}

export default GroupRouter;
