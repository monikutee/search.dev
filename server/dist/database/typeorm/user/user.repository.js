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
exports.upsertUser = exports.getUsersByIds = exports.getSingleUserById = exports.getSingleUserByEmail = void 0;
const typeorm_1 = require("typeorm");
const connection_1 = require("../../../connection");
const user_entity_1 = require("./user.entity");
function getSingleUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = connection_1.AppDB.getRepository(user_entity_1.User);
        return ((yield userRepository.findOne({
            where: { email },
        })) || undefined);
    });
}
exports.getSingleUserByEmail = getSingleUserByEmail;
function getSingleUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = connection_1.AppDB.getRepository(user_entity_1.User);
        return ((yield userRepository.findOne({
            where: { id },
        })) || undefined);
    });
}
exports.getSingleUserById = getSingleUserById;
function getUsersByIds(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = connection_1.AppDB.getRepository(user_entity_1.User);
        return ((yield userRepository.find({
            where: { id: (0, typeorm_1.In)(ids) },
        })) || undefined);
    });
}
exports.getUsersByIds = getUsersByIds;
function upsertUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = connection_1.AppDB.getRepository(user_entity_1.User);
        const newUser = userRepository.create(user);
        return yield userRepository.save(newUser);
    });
}
exports.upsertUser = upsertUser;
exports.default = {
    getSingleUserByEmail,
    getSingleUserById,
    upsertUser,
    getUsersByIds,
};
//# sourceMappingURL=user.repository.js.map