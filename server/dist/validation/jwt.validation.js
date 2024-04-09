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
exports.validateJwt = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default
    .object({
    exp: joi_1.default
        .number()
        .required()
        .min(Date.now() / 1000)
        .messages({
        "number.base": `Expiration should be a type of number`,
        "number.empty": `Expiration missing`,
        "number.max": `User login time expired`,
        "any.required": `Expiration missing`,
    }),
})
    .required()
    .messages({
    "any.required": `JWT token missing`,
});
function validateJwt(jwt) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield schema.validateAsync(jwt, { allowUnknown: true });
    });
}
exports.validateJwt = validateJwt;
//# sourceMappingURL=jwt.validation.js.map