import express, { Application, NextFunction, Response } from 'express';
import indexRouter from './routes/index.router.js';

import db from './data/database/db.js';
import AuthenticatedRequest from './interfaces/utility_interfaces/request.interface.js';
import { failedResponse } from './utils/responseMessage.js';

import errorHandlerMiddlware from './middlewares/handlers/error.handler.handler.js';
const app: Application= express();


app.use(express.json()); // So express can handle Requests that include JSON in the body.
//app.use(express.urlencoded());
app.use("/api", indexRouter);

app.use(errorHandlerMiddlware)

process.on("uncaughtException", (error) => {
    console.error(error);
  })
  
     db.sequelize.sync({alter:true}).then(()=>{
        console.log("database sync");
     }).catch((error:Error)=>{

        console.error(error);
     });
        
 

export default app;

