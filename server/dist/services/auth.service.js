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
exports.authJwt = exports.authLocal = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_validation_1 = require("../validation/user.validation");
const jwt_validation_1 = require("../validation/jwt.validation");
const errors_enum_1 = require("../types/errors.enum");
const app_errors_1 = require("../helpers/app-errors");
function authLocal(password, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user) {
            throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.WRONG_EMAIL);
        }
        yield (0, user_validation_1.validatePassword)(user.password);
        const passwordsMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordsMatch) {
            throw new app_errors_1.AppErrors(errors_enum_1.ERROR_CODES.WRONG_PASSWORD);
        }
    });
}
exports.authLocal = authLocal;
function authJwt(jwtPayload) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, jwt_validation_1.validateJwt)(jwtPayload);
    });
}
exports.authJwt = authJwt;
exports.default = { authLocal, authJwt };
//# sourceMappingURL=auth.service.js.map