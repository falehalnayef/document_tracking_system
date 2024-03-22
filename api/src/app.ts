import express, { Application } from 'express';
import routes from './routes/index';

import connection from './data/database/connection';
import eventEmitter from './services/event_emitter.service';

const app: Application= express();


app.use(routes);


process.on("uncaughtException", (error) => {
    console.log(error);
  })
  
     connection.sequelize.sync({force:true}).then(()=>{
        console.log("database sync");
     }).catch((error:Error)=>{

        console.error(error);
     });
        
 

export default app;

