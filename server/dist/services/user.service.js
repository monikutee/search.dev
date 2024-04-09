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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishPasswordReset = exports.startPasswordReset = exports.getUserCompact = exports.getUser = exports.getUsersByIds = exports.getUserById = exports.editUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_validation_1 = require("../validation/user.validation");
const typeorm_1 = __importDefault(require("../database/typeorm"));
const app_errors_1 = require("../helpers/app-errors");
const errors_enum_1 = require("../types/errors.enum");
const mailer_service_1 = __importDefault(require("./mailer.service"));
const createUser = (dependencies = {
    upsertUser: typeorm_1.default.userRepository.upsertUser,
}) => (email, password, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        email,
        password,
    };
    yield (0, user_validation_1.validateUser)(user);
    user.password = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield dependencies.upsertUser(user);
    return newUser;
});
exports.createUser = createUser;
const editUser = (dependencies = {
    upsertUser: typeorm_1.default.userRepository.upsertUser,
}) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.email) {
        yield (0, user_validation_1.validateEmail)(user.email);
    }
    const updatedUser = yield dependencies.upsertUser(user);
    return updatedUser;
});
exports.editUser = editUser;
const getUserById = (dependencies = {
    getSingleUserById: typeorm_1.default.userRepository.getSingleUserById,
}) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield dependencies.getSingleUserById(id);
    if (!user) {
        throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.USER_MISSING);
    }
    return user;
});
exports.getUserById = getUserById;
const getUsersByIds = (dependencies = {
    getUsersByIds: typeorm_1.default.userRepository.getUsersByIds,
}) => (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield dependencies.getUsersByIds(ids);
    if (!user) {
        throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.USER_MISSING);
    }
    return user;
});
exports.getUsersByIds = getUsersByIds;
const getUser = (dependencies = {
    getSingleUserByEmail: typeorm_1.default.userRepository.getSingleUserByEmail,
}) => (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield dependencies.getSingleUserByEmail(email);
    if (!user) {
        throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.USER_MISSING);
    }
    return user;
});
exports.getUser = getUser;
const getUserCompact = (dependencies = {
    getUser: (0, exports.getUser)(),
}) => (data) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    if (typeof data === "string") {
        user = yield dependencies.getUser(data);
    }
    else {
        user = data;
    }
    return {
        id: user.id,
        email: user.email,
        credits: user.credits,
        phoneNumber: user.phoneNumber,
        name: user.name,
        country: user.country,
        city: user.city,
        newsletters: user.newsletters,
        newMessageNotificationsEmail: user.newMessageNotificationsEmail,
        newMessageNotificationsPhone: user.newMessageNotificationsPhone,
        createdAt: user.createdAt,
    };
});
exports.getUserCompact = getUserCompact;
const startPasswordReset = (dependencies = {
    createPasswordReset: typeorm_1.default.dataResetRepository.createDataReset,
    getUser: (0, exports.getUser)(),
    resetPassword: mailer_service_1.default.resetPassword,
}) => (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.EMAIL_MISSING);
    }
    const user = yield dependencies.getUser(email);
    if (!user) {
        throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.USER_MISSING);
    }
    const passwordReset = {
        userId: user.id,
        resetExpires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    };
    yield dependencies.createPasswordReset(passwordReset);
    yield dependencies.resetPassword(user.email, passwordReset.id);
});
exports.startPasswordReset = startPasswordReset;
const finishPasswordReset = (dependencies = {
    getValidResetById: typeorm_1.default.dataResetRepository.getValidResetById,
    finishPasswordreset: typeorm_1.default.dataResetRepository.finishDataReset,
    getSingleUserById: typeorm_1.default.userRepository.getSingleUserById,
    upsertUser: typeorm_1.default.userRepository.upsertUser,
    resetPasswordSucc: mailer_service_1.default.resetPasswordSucc,
}) => (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.RESET_TOKEN_MISSING);
    }
    if (!newPassword) {
        throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.RESET_PASSWORD_MISSING);
    }
    const passwordReset = yield dependencies.getValidResetById(id);
    if (!passwordReset) {
        throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.RESET_PASSWORD_NOT_FOUND);
    }
    const user = yield dependencies.getSingleUserById(passwordReset.userId);
    if (!user) {
        throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.USER_MISSING);
    }
    const isValid = new Date().getTime() < new Date(passwordReset.resetExpires).getTime();
    if (!isValid) {
        throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.RESET_PASSWORD_EXPIRED);
    }
    yield dependencies.finishPasswordreset(passwordReset.id);
    user.password = yield bcrypt_1.default.hash(newPassword, 10);
    yield dependencies.upsertUser(user);
    yield dependencies.resetPasswordSucc(user.email);
});
exports.finishPasswordReset = finishPasswordReset;
exports.default = {
    createUser: (0, exports.createUser)(),
    editUser: (0, exports.editUser)(),
    getUser: (0, exports.getUser)(),
    getUserById: (0, exports.getUserById)(),
    getUsersByIds: (0, exports.getUsersByIds)(),
    getUserCompact: (0, exports.getUserCompact)(),
    startPasswordReset: (0, exports.startPasswordReset)(),
    finishPasswordReset: (0, exports.finishPasswordReset)(),
};
//# sourceMappingURL=user.service.js.map