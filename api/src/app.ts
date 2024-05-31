import express, { Application } from "express";
import indexRouter from "./routes/index.router.js";
import Scheduler from "./services/utility_services/scheduler.service.js";
import db from "./data/database/db.js";
import morgan from "morgan";
import cors from "cors";
import errorHandlerMiddlware from "./middlewares/handlers/error.handler.handler.js";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
import path from "path";

const app: Application = express();
const scheduler = new Scheduler();

const file = fs.readFileSync(path.join(__dirname.replace("\\api\\dist", ""), "\\swagger.yaml"), "utf8");
const swaggerDocument = YAML.parse(file)
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json()); 
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api", indexRouter);
app.use(errorHandlerMiddlware);


process.on("uncaughtException", (error) => {
  console.error(error);
});

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database sync");
    scheduler.run();
  })
  .catch((error: Error) => {
    console.error(error);
  });

export default app;
