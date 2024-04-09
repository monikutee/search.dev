"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const app = (0, express_1.default)();
const apiRoot = process.env.API_ROOT;
app.post(`${apiRoot}/auth/jwt`, controllers_1.authController.authJWT);
exports.default = app;
//# sourceMappingURL=auth.routes.js.map