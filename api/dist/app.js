"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const connection_1 = __importDefault(require("./data/database/connection"));
const app = (0, express_1.default)();
app.use(index_1.default);
process.on("uncaughtException", (error) => {
    console.log(error);
});
connection_1.default.sequelize.sync({ force: true }).then(() => {
    console.log("database sync");
}).catch((error) => {
    console.error(error);
});
exports.default = app;
