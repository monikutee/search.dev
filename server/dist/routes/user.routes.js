"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const app = (0, express_1.default)();
const apiRoot = process.env.API_ROOT;
app.get(`${apiRoot}/user/:id`, controllers_1.userController.getUserById);
app.post(`${apiRoot}/user/get`, controllers_1.userController.getUsersByIds);
app.post(`${apiRoot}/user/login`, controllers_1.userController.login);
app.post(`${apiRoot}/user/edit`, controllers_1.userController.edit);
app.post(`${apiRoot}/user/signup`, controllers_1.userController.signup);
app.post(`${apiRoot}/user/refresh`, controllers_1.userController.refresh);
app.post(`${apiRoot}/user/start-password-reset`, controllers_1.userController.startPasswordReset);
app.post(`${apiRoot}/user/finish-password-reset`, controllers_1.userController.finishPasswordReset);
exports.default = app;
//# sourceMappingURL=user.routes.js.map