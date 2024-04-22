import express from "express";
import { userController } from "../controllers";
import { verifyUser } from "../middleware/verify-user";

const app = express();
const apiRoot = process.env.API_ROOT;

app.post(`${apiRoot}/user/login`, userController.login);
app.post(`${apiRoot}/user/signup`, userController.signup);
app.get(`${apiRoot}/user/:id`, verifyUser, userController.getUserById);
app.post(`${apiRoot}/user/logout`, verifyUser, userController.logout);
app.post(`${apiRoot}/user/get`, verifyUser, userController.getUsersByIds);
app.post(`${apiRoot}/user/edit`, verifyUser, userController.edit);
app.post(`${apiRoot}/user/refresh`, verifyUser, userController.refresh);
app.post(
  `${apiRoot}/user/start-password-reset`,
  verifyUser,
  userController.startPasswordReset
);
app.post(
  `${apiRoot}/user/finish-password-reset`,
  verifyUser,
  userController.finishPasswordReset
);
app.post(`${apiRoot}/user/verify/:token`, userController.checkVerification);

export default app;
