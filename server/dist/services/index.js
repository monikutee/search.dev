"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerService = exports.userService = exports.authService = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
exports.authService = auth_service_1.default;
const user_service_1 = __importDefault(require("./user.service"));
exports.userService = user_service_1.default;
const mailer_service_1 = __importDefault(require("./mailer.service"));
exports.mailerService = mailer_service_1.default;
exports.default = { authService: auth_service_1.default, userService: user_service_1.default, mailerService: mailer_service_1.default };
//# sourceMappingURL=index.js.map