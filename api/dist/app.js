"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_router_1 = __importDefault(require("./routes/index.router"));
const db_1 = __importDefault(require("./data/database/db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(index_router_1.default);
process.on("uncaughtException", (error) => {
    console.log(error);
});
db_1.default.sequelize.sync({ force: false }).then(() => {
    console.log("database sync");
}).catch((error) => {
    console.error(error);
});
exports.default = app;
