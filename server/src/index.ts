import express from "express";
import connection from "./connection";
import userApp from "./routes/user.routes";
import authApp from "./routes/auth.routes";
import { validateEnv } from "./validation/env.validation";

require("dotenv").config({
  path: __dirname + `/../.env`,
});

const app = express();
const PORT = 2000;

connection
  .create()
  .then(async (_connection) => {
    await validateEnv(process.env);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(userApp);
    app.use(authApp);

    app.listen(PORT, () => {
      console.log(`Listening on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("TypeORM connection error: ", error);
  });
