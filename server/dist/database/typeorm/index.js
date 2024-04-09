"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("./user/user.repository"));
const data_reset_repository_1 = __importDefault(require("./data-resets/data-reset.repository"));
exports.default = { userRepository: user_repository_1.default, dataResetRepository: data_reset_repository_1.default };
//# sourceMappingURL=index.js.map