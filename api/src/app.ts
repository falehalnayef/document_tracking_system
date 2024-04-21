import express, { Application } from 'express';
import indexRouter from './routes/index.router.js';

import db from './data/database/db.js';

const app: Application= express();


app.use(express.json()); // So express can handle Requests that include JSON in the body.
//app.use(express.urlencoded());
app.use("/api", indexRouter);


process.on("uncaughtException", (error) => {
    console.error(error);
  })
  
     db.sequelize.sync({alter:true}).then(()=>{
        console.log("database sync");
     }).catch((error:Error)=>{

        console.error(error);
     });
        
 

export default app;

