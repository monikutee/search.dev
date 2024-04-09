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
exports.finishDataReset = exports.createDataReset = exports.getValidResetById = void 0;
const typeorm_1 = require("typeorm");
const connection_1 = require("../../../connection");
const data_reset_entity_1 = require("./data-reset.entity");
function getValidResetById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const DataResetRepository = connection_1.AppDB.getRepository(data_reset_entity_1.DataReset);
        return ((yield DataResetRepository.findOne({
            where: {
                id,
                reseted: false,
                resetExpires: (0, typeorm_1.MoreThan)(new Date()),
            },
        })) || undefined);
    });
}
exports.getValidResetById = getValidResetById;
function createDataReset(DataReset) {
    return __awaiter(this, void 0, void 0, function* () {
        const DataResetRepository = connection_1.AppDB.getRepository(data_reset_entity_1.DataReset);
        DataResetRepository.create(Object.assign(Object.assign({}, DataReset), { reseted: false }));
        return yield DataResetRepository.save(DataReset);
    });
}
exports.createDataReset = createDataReset;
function finishDataReset(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const DataResetRepository = connection_1.AppDB.getRepository(data_reset_entity_1.DataReset);
        return yield DataResetRepository.save({
            id,
            reseted: true,
        });
    });
}
exports.finishDataReset = finishDataReset;
exports.default = { getValidResetById, createDataReset, finishDataReset };
//# sourceMappingURL=data-reset.repository.js.map