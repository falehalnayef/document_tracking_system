import express, { Application } from 'express';
import indexRouter from './routes/index.router';

import db from './data/database/db';

const app: Application= express();


app.use(express.json());
app.use(indexRouter);


process.on("uncaughtException", (error) => {
    console.log(error);
  })
  
     db.sequelize.sync({force:false}).then(()=>{
        console.log("database sync");
     }).catch((error:Error)=>{

        console.error(error);
     });
        
 

export default app;

