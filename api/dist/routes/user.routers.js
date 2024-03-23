"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
class UserRouter {
    constructor() {
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userController.createUser(req, res);
            }
            catch (error) {
                next(error);
            }
        });
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/createUser", this.createUser);
    }
}
exports.default = new UserRouter().router;
