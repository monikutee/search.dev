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
exports.validateEnv = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default
    .object({
    POSTGRES_DB: joi_1.default.string().required(),
    POSTGRES_USER: joi_1.default.string().required(),
    POSTGRES_PASSWORD: joi_1.default.string().required(),
    POSTGRES_HOST: joi_1.default.string().required(),
    POSTGRES_PORT: joi_1.default.number().required(),
    // PGADMIN_EMAIL: joi.string().required(),
    // PGADMIN_PASSWORD: joi.string().required(),
    // PGADMIN_PORT: joi.string().required(),
    API_ROOT: joi_1.default.string().required(),
    ACCESS_TOKEN_SECRET: joi_1.default.string().required(),
})
    .required()
    .messages({
    "any.required": `env is missing`,
});
function validateEnv(env) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield schema.validateAsync(env, { allowUnknown: true });
    });
}
exports.validateEnv = validateEnv;
//# sourceMappingURL=env.validation.js.map