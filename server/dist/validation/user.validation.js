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
exports.validatePassword = exports.validateEmail = exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const app_errors_1 = require("../helpers/app-errors");
const errors_enum_1 = require("../types/errors.enum");
const emailShema = joi_1.default
    .string()
    .pattern(new RegExp("^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$"))
    .required()
    .messages({
    "string.base": errors_enum_1.ERROR_CODES.WRONG_EMAIL_BASE,
    "string.empty": errors_enum_1.ERROR_CODES.WRONG_EMAIL_EMPTY,
    "string.pattern.base": errors_enum_1.ERROR_CODES.WRONG_EMAIL_FORMAT,
    "any.required": errors_enum_1.ERROR_CODES.WRONG_EMAIL_UNDEFINED,
});
const passwordShema = joi_1.default.string().required().min(5).max(60).messages({
    "string.base": errors_enum_1.ERROR_CODES.WRONG_PASSWORD_BASE,
    "string.empty": errors_enum_1.ERROR_CODES.WRONG_PASSWORD_EMPTY,
    "string.min": errors_enum_1.ERROR_CODES.WRONG_PASSWORD_SHORT,
    "string.max": errors_enum_1.ERROR_CODES.WRONG_PASSWORD_LONG,
    "any.required": errors_enum_1.ERROR_CODES.WRONG_PASSWORD_UNDEFINED,
});
const schema = joi_1.default.object({
    email: emailShema,
    password: passwordShema,
});
function handleError(e) {
    var _a;
    throw new app_errors_1.AppErrors(e.details.length > 0
        ? (_a = e.details[0]) === null || _a === void 0 ? void 0 : _a.message
        : errors_enum_1.ERROR_CODES.WRONG_EMAIL);
}
function validateUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield schema
            .validateAsync(user, { allowUnknown: true })
            .catch((e) => handleError);
    });
}
exports.validateUser = validateUser;
function validateEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield emailShema.validateAsync(email).catch((e) => handleError);
    });
}
exports.validateEmail = validateEmail;
function validatePassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield passwordShema.validateAsync(password).catch((e) => handleError);
    });
}
exports.validatePassword = validatePassword;
//# sourceMappingURL=user.validation.js.map