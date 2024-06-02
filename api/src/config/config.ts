import env from "dotenv";
env.config();

export default {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DRIVER: process.env.DB_DRIVER,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
