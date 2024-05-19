import express, { Application } from "express";
import indexRouter from "./routes/index.router.js";
import Scheduler from "./services/utility_services/scheduler.service.js";
import db from "./data/database/db.js";
import morgan from "morgan";
import cors from "cors";
import errorHandlerMiddlware from "./middlewares/handlers/error.handler.handler.js";
const app: Application = express();
const scheduler = new Scheduler();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json()); // So express can handle Requests that include JSON in the body.
//app.use(express.urlencoded());
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
