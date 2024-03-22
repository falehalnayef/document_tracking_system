"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    "DB_USER": process.env.DB_USER,
    "DB_PASSWORD": process.env.DB_PASSWORD,
    "DB_NAME": process.env.DB_NAME,
    "DB_HOST": process.env.DB_HOST,
    "DB_PORT": process.env.DB_PORT,
    "DB_DRIVER": process.env.DB_DRIVER
};
