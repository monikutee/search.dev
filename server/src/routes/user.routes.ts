import express from "express";
import { userController } from "../controllers";
const app = express();
const apiRoot = process.env.API_ROOT;

app.get(`${apiRoot}/user/:id`, userController.getUserById);
app.post(`${apiRoot}/user/get`, userController.getUsersByIds);
app.post(`${apiRoot}/user/login`, userController.login);
app.post(`${apiRoot}/user/edit`, userController.edit);
app.post(`${apiRoot}/user/signup`, userController.signup);
app.post(`${apiRoot}/user/refresh`, userController.refresh);
app.post(
  `${apiRoot}/user/start-password-reset`,
  userController.startPasswordReset
);
app.post(
  `${apiRoot}/user/finish-password-reset`,
  userController.finishPasswordReset
);

export default app;
