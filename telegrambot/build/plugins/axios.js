"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosServerInstance = exports.axiosVPNInstance = exports.setupInterceptors = void 0;
require("dotenv/config");
var axios_1 = __importDefault(require("axios"));
var axios_interceptors_1 = require("./axios.interceptors");
var setupInterceptors = function (instance) {
    instance.interceptors.request.use(axios_interceptors_1.onRequest, axios_interceptors_1.onErrorResponse);
    instance.interceptors.response.use(axios_interceptors_1.onResponse, axios_interceptors_1.onErrorResponse);
    return instance;
};
exports.setupInterceptors = setupInterceptors;
exports.axiosVPNInstance = axios_1.default.create();
exports.axiosServerInstance = axios_1.default.create({
    baseURL: (_a = process.env.SERVER_BASE_URL) !== null && _a !== void 0 ? _a : 'http://localhost:8080/api',
});
(0, exports.setupInterceptors)(exports.axiosVPNInstance);
