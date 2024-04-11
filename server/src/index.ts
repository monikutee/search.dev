import express from "express";
import connection from "./connection";
import userApp from "./routes/user.routes";
import authApp from "./routes/auth.routes";
import { validateEnv } from "./validation/env.validation";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import cors from "cors";
import { hookApiTracker } from "./middleware/api-tracker";
import {
  getEndpointDayCallCountByIp,
  saveApiData,
} from "./database/typeorm/api-data/api-data.repository";

require("dotenv").config({
  path: __dirname + `/../.env`,
});

const app = express();
const PORT = 2000;

connection
  .create()
  .then(async (_connection) => {
    const dependencies = {
      getEndpointDayCallCountByIp,
      saveApiData,
    };
    const apiTrackerMiddleware = hookApiTracker(dependencies);

    await validateEnv(process.env);
    app.use((req, res, next) =>
      apiTrackerMiddleware(
        req,
        res,
        () =>
          new Promise<Response>((_resolve, reject) => {
            try {
              next();
            } catch (error) {
              reject(error);
            }
          })
      )
    );

    app.use(function (req: Request, res: Response, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.header("Content-Type", "application/json;charset=UTF-8");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
    app.use(cookieParser());
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
