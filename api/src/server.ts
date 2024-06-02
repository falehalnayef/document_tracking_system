import app from "./app";
import env from "dotenv";
env.config();

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log("listening to port 3000...");
});
