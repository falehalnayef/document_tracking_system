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
const user_repository_1 = __importDefault(require("../../data/repositories/user.repository"));
const user_1 = __importDefault(require("../../dto/user"));
const hash_services_1 = __importDefault(require("../utility_services/hash.services"));
const validators_1 = __importDefault(require("../../validation/validators"));
class UserServices {
    constructor() {
        this.hashServices = new hash_services_1.default();
        this.userRepository = new user_repository_1.default();
        this.validator = new validators_1.default();
    }
    register(user_name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validator.registerValidator(user_name, email, password);
            const hashedPassword = yield this.hashServices.hash(password, 10);
            const user = yield this.userRepository.create(user_name, email, hashedPassword);
            return new user_1.default(user);
        });
    }
}
exports.default = UserServices;
