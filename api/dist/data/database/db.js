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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config/config"));
const event_emitter_service_1 = __importDefault(require("../../services/event_emitter.service"));
const models_path = path_1.default.join(__dirname.replace("database", ""), "/models");
const db = {};
let sequelize;
function connect_to_db() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            sequelize = new sequelize_1.Sequelize(`${config_1.default.DB_DRIVER}://${config_1.default.DB_USER}:${config_1.default.DB_PASSWORD}@${config_1.default.DB_HOST}:${config_1.default.DB_PORT}/${config_1.default.DB_NAME}`, { logging: false });
            yield sequelize.authenticate();
            console.log("connected to db");
        }
        catch (error) {
            console.log("failed to connect to db");
            console.error(error);
            setTimeout(() => {
                event_emitter_service_1.default.emit("connecting to db");
            }, 10000);
        }
    });
}
event_emitter_service_1.default.on("connecting to db", connect_to_db);
event_emitter_service_1.default.emit("connecting to db");
fs_1.default.readdirSync(models_path).forEach((file) => {
    const model = require(path_1.default.join(models_path, file));
    const modelInstance = model.default(sequelize);
    db[modelInstance.name] = modelInstance;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
module.exports = db;
