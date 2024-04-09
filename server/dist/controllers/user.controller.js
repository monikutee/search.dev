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
exports.loginLocal = exports.finishPasswordReset = exports.startPasswordReset = exports.refresh = exports.signup = exports.edit = exports.getUsersByIds = exports.getUserById = void 0;
const app_errors_1 = require("../helpers/app-errors");
const util_1 = require("../helpers/util");
const services_1 = require("../services");
const getUserById = (dependencies = {
    getUserById: services_1.userService.getUserById,
}) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield dependencies.getUserById(id).catch(() => undefined);
        if (!user) {
            res.status(400).json("User not found");
        }
        res.status(200).json(user);
    }
    catch (e) {
        (0, app_errors_1.handleErrorResponse)(e, res);
    }
});
exports.getUserById = getUserById;
const getUsersByIds = (dependencies = {
    getUsersByIds: services_1.userService.getUsersByIds,
}) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids } = req.body;
        const users = yield dependencies
            .getUsersByIds(ids)
            .catch(() => undefined);
        res.status(200).json(users);
    }
    catch (e) {
        (0, app_errors_1.handleErrorResponse)(e, res);
    }
});
exports.getUsersByIds = getUsersByIds;
const edit = (dependencies = {
    editUser: services_1.userService.editUser,
}) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //local auth on gateway side
        const user = req.body;
        delete user.credits;
        delete user.password;
        console.log("user before", user);
        const editedUser = yield dependencies.editUser(user);
        const accessToken = (0, util_1.getAccessToken)(editedUser.id, editedUser.email);
        res
            .cookie("jwt", accessToken, {
            httpOnly: true,
            secure: false,
        })
            .status(200)
            .json({ accessToken, user: editedUser });
    }
    catch (e) {
        (0, app_errors_1.handleErrorResponse)(e, res);
    }
});
exports.edit = edit;
const signup = (dependencies = {
    createUser: services_1.userService.createUser,
}) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield dependencies.createUser(email, password, "signup");
        const accessToken = (0, util_1.getAccessToken)(user.id, user.email);
        res.cookie("jwt", accessToken, {
            httpOnly: true,
            secure: false,
        });
        res.status(200);
        res.json({ accessToken: accessToken });
    }
    catch (e) {
        (0, app_errors_1.handleErrorResponse)(e, res);
    }
});
exports.signup = signup;
const refresh = (dependencies = {
    getUserCompact: services_1.userService.getUserCompact,
}) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //jwt auth on gateway side
    const { email } = req.body;
    const compactUser = yield dependencies.getUserCompact(email);
    delete compactUser.id;
    res.status(200).json(compactUser);
});
exports.refresh = refresh;
const startPasswordReset = (dependencies = { startPasswordReset: services_1.userService.startPasswordReset }) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        yield dependencies.startPasswordReset(email);
        res.send("An e-mail has been sent to " + email + " with further instructions.");
    }
    catch (e) {
        (0, app_errors_1.handleErrorResponse)(e, res);
    }
});
exports.startPasswordReset = startPasswordReset;
const finishPasswordReset = (dependencies = { finishPasswordReset: services_1.userService.finishPasswordReset }) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, password } = req.body;
        yield dependencies.finishPasswordReset(token, password);
        res.status(200).send("ok");
    }
    catch (e) {
        (0, app_errors_1.handleErrorResponse)(e, res);
    }
});
exports.finishPasswordReset = finishPasswordReset;
const loginLocal = (dependencies = {
    getUser: services_1.userService.getUser,
    authLocal: services_1.authService.authLocal,
}) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield dependencies.getUser(email);
        yield dependencies.authLocal(password, user);
        const accessToken = (0, util_1.getAccessToken)(user.id, email);
        res
            .cookie("jwt", accessToken, {
            httpOnly: true,
            secure: false,
        })
            .status(200)
            .json({ accessToken });
    }
    catch (e) {
        (0, app_errors_1.handleErrorResponse)(e, res);
    }
});
exports.loginLocal = loginLocal;
exports.default = {
    login: (0, exports.loginLocal)(),
    getUserById: (0, exports.getUserById)(),
    getUsersByIds: (0, exports.getUsersByIds)(),
    edit: (0, exports.edit)(),
    signup: (0, exports.signup)(),
    refresh: (0, exports.refresh)(),
    startPasswordReset: (0, exports.startPasswordReset)(),
    finishPasswordReset: (0, exports.finishPasswordReset)(),
};
//# sourceMappingURL=user.controller.js.map