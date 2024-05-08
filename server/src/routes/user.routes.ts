import express from "express";
import { userController } from "../controllers";
import { verifyUser } from "../middleware/verify-user";

const app = express();
const apiRoot = process.env.API_ROOT;

app.post(`${apiRoot}/user/login`, userController.login);
app.post(`${apiRoot}/user/signup`, userController.signup);
app.get(`${apiRoot}/user/:userId`, verifyUser, userController.getUserById);
app.post(`${apiRoot}/user/:userId/logout`, verifyUser, userController.logout);
app.post(`${apiRoot}/user/:userId/get`, verifyUser, userController.getUserById);
app.post(`${apiRoot}/user/:userId/edit`, verifyUser, userController.edit);
app.post(`${apiRoot}/user/:userId/refresh`, verifyUser, userController.refresh);
app.post(
  `${apiRoot}/user/start-password-reset`,
  userController.startPasswordReset
);
app.post(
  `${apiRoot}/user/finish-password-reset`,
  userController.finishPasswordReset
);

app.post(`${apiRoot}/user/verify/:token`, userController.checkVerification);

export default app;
