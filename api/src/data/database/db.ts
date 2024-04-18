import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model } from 'sequelize';
import config from "../../config/config.js";

  import eventEmitter from '../../services/utility_services/event_emitter.service.js';

const models_path = path.join(__dirname.replace("database",""), "/models");

const db: any = {};
let sequelize: Sequelize;

async function connect_to_db() {
  try {
    
    sequelize = new Sequelize(`${config.DB_DRIVER}://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`,{logging:false});

    await sequelize.authenticate();

    console.log("connected to db");

  } catch (error) {

    console.log("failed to connect to db");
    console.error(error);

    setTimeout(() => {
      eventEmitter.emit("connecting to db");

    }, 10000);
  }
}

eventEmitter.on("connecting to db", connect_to_db);


eventEmitter.emit("connecting to db");




fs.readdirSync(models_path).forEach((file) => {
  const model = require(path.join(models_path, file));
  const modelInstance =  model.default(sequelize);
  db[modelInstance.name] = modelInstance; 
});


Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize!;
db.Sequelize = Sequelize;

export default db;