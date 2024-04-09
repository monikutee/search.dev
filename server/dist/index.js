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
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./connection"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const env_validation_1 = require("./validation/env.validation");
require("dotenv").config({
    path: __dirname + `/../.env`,
});
const app = (0, express_1.default)();
const PORT = 2000;
connection_1.default
    .create()
    .then((_connection) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, env_validation_1.validateEnv)(process.env);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(user_routes_1.default);
    app.use(auth_routes_1.default);
    app.listen(PORT, () => {
        console.log(`Listening on port: http://localhost:${PORT}`);
    });
}))
    .catch((error) => {
    console.log("TypeORM connection error: ", error);
});
//# sourceMappingURL=index.js.map