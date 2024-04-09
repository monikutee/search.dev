"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosRequests = exports.convertToSnakeCase = exports.verifyAccessToken = exports.getAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
function getAccessToken(id, email) {
    const accessToken = jsonwebtoken_1.default.sign({ email, userId: id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "750h",
    });
    console.log(process.env.ACCESS_TOKEN_SECRET, accessToken);
    return accessToken;
}
exports.getAccessToken = getAccessToken;
function verifyAccessToken(jwtString) {
    const verify = jsonwebtoken_1.default.verify(jwtString, process.env.ACCESS_TOKEN_SECRET);
    console.log(process.env.ACCESS_TOKEN_SECRET, verify);
    return verify;
}
exports.verifyAccessToken = verifyAccessToken;
function convertToSnakeCase(value) {
    return value
        .replace(/\.?([A-Z])/g, function (x, y) {
        return "_" + y.toLowerCase();
    })
        .replace(/^_/, "");
}
exports.convertToSnakeCase = convertToSnakeCase;
function axiosRequests(url, port) {
    function combineParams(params) {
        if (!params) {
            return "";
        }
        let paramString = "";
        for (const [key, value] of Object.entries(params)) {
            if (paramString === "") {
                paramString += "?";
            }
            else {
                paramString += "&";
            }
            paramString += `${key}=${value}`;
        }
        return paramString;
    }
    function axiosGet(endpoint, params, headers) {
        return axios_1.default.get(`${url}:${port}${endpoint}${combineParams(params)}`, headers);
    }
    function axiosPost(endpoint, body, params, headers) {
        return axios_1.default.post(`${url}:${port}${endpoint}${combineParams(params)}`, body, headers);
    }
    return {
        axiosGet,
        axiosPost,
    };
}
exports.axiosRequests = axiosRequests;
//# sourceMappingURL=util.js.map