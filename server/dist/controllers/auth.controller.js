"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJWT = void 0;
const util_1 = require("../helpers/util");
const services_1 = require("../services");
const app_errors_1 = require("../helpers/app-errors");
const authJWT = (dependencies = {
    authJwt: services_1.authService.authJwt,
    getUser: services_1.userService.getUser,
}) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jwt } = req.body;
    console.log("jwt", jwt);
    try {
        const userData = (0, util_1.verifyAccessToken)(jwt);
        yield dependencies.authJwt(userData);
        const userCompact = yield dependencies.getUser(userData.email);
        return res.status(200).json(userCompact);
    }
    catch (e) {
        (0, app_errors_1.handleErrorResponse)(e, res);
    }
});
exports.authJWT = authJWT;
exports.default = {
    authJWT: (0, exports.authJWT)(),
};
//# sourceMappingURL=auth.controller.js.map