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
exports.resetEmailSucc = exports.resetEmail = exports.resetPasswordSucc = exports.resetPassword = void 0;
const util_1 = require("../helpers/util");
const NOTIFICATION_API_PORT = process.env.NOTIFICATION_API_PORT;
const NOTIFICATION_API_ENDPOINT = process.env.NOTIFICATION_API_ENDPOINT;
const API_ROOT = process.env.API_ROOT;
const userAxiosRequests = (0, util_1.axiosRequests)(NOTIFICATION_API_ENDPOINT, NOTIFICATION_API_PORT);
const axiosPost = userAxiosRequests.axiosPost;
const resetPassword = (dependencies = {
    axiosPost,
}) => (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    yield dependencies
        .axiosPost(`${API_ROOT}/mailer/reset-password`, {
        email,
        token,
    })
        .then(response => response.data)
        .catch(e => {
        console.log(e.message, e.stack);
        return undefined;
    });
});
exports.resetPassword = resetPassword;
const resetPasswordSucc = (dependencies = {
    axiosPost,
}) => (email) => __awaiter(void 0, void 0, void 0, function* () {
    yield dependencies
        .axiosPost(`${API_ROOT}/mailer/reset-password-success`, {
        email,
    })
        .then(response => response.data)
        .catch(e => {
        console.log(e.message, e.stack);
        return undefined;
    });
});
exports.resetPasswordSucc = resetPasswordSucc;
const resetEmail = (dependencies = {
    axiosPost,
}) => (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    yield dependencies
        .axiosPost(`${API_ROOT}/mailer/reset-email`, {
        email,
        token,
    })
        .then(response => response.data)
        .catch(e => {
        console.log(e.message, e.stack);
        return undefined;
    });
});
exports.resetEmail = resetEmail;
const resetEmailSucc = (dependencies = {
    axiosPost,
}) => (email) => __awaiter(void 0, void 0, void 0, function* () {
    yield dependencies
        .axiosPost(`${API_ROOT}/mailer/reset-email-success`, {
        email,
    })
        .then(response => response.data)
        .catch(e => {
        console.log(e.message, e.stack);
        return undefined;
    });
});
exports.resetEmailSucc = resetEmailSucc;
exports.default = {
    resetPassword: (0, exports.resetPassword)(),
    resetPasswordSucc: (0, exports.resetPasswordSucc)(),
    resetEmail: (0, exports.resetEmail)(),
    resetEmailSucc: (0, exports.resetEmailSucc)(),
};
//# sourceMappingURL=mailer.service.js.map