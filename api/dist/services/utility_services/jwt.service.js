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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const error_1 = __importDefault(require("../../utils/error"));
class JWTServices {
    constructor() {
        this.secretKey = config_1.default.JWT_SECRET_KEY;
    }
    generateToken(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.secretKey || !payload) {
                throw new error_1.default(404, "Bad Request");
            }
            return jsonwebtoken_1.default.sign(payload, this.secretKey, options);
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.secretKey || !token) {
                throw new error_1.default(404, "Bad Request");
            }
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        });
    }
}
exports.default = JWTServices;
