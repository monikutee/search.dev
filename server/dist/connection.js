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
exports.AppDB = void 0;
const typeorm_1 = require("typeorm");
const data_reset_entity_1 = require("./database/typeorm/data-resets/data-reset.entity");
const user_entity_1 = require("./database/typeorm/user/user.entity");
require("dotenv").config({
    path: __dirname + `/../.env`,
});
exports.AppDB = new typeorm_1.DataSource({
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: +(process.env.POSTGRES_PORT || 5432),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dropSchema: false,
    logging: false,
    synchronize: true,
    migrationsRun: true,
    entities: [user_entity_1.User, data_reset_entity_1.DataReset],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
});
const connection = {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.AppDB.initialize();
        });
    },
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.AppDB.destroy();
        });
    },
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = exports.AppDB.entityMetadatas;
            for (const entity of entities) {
                const repository = exports.AppDB.getRepository(entity.name);
                repository && (yield repository.clear());
            }
        });
    },
};
exports.default = connection;
//# sourceMappingURL=connection.js.map