import express from "express";
import { authController } from "../controllers";

const app = express();
const apiRoot = process.env.API_ROOT;

app.post(`${apiRoot}/auth/jwt`, authController.authJWT);

export default app;
