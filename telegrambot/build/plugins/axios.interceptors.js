"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onErrorResponse = exports.onResponse = exports.onRequest = void 0;
var axios_1 = __importDefault(require("axios"));
var auth_services_1 = require("../services/auth.services");
// Request Interceptor
var onRequest = function (config) {
    var method = config.method, url = config.url;
    var baseUrl = "http://".concat(url === null || url === void 0 ? void 0 : url.split('/')[2]);
    if (auth_services_1.AuthServiceInstance.cookies.size > 0) {
        config.headers['Cookie'] = auth_services_1.AuthServiceInstance.cookies.get(baseUrl);
    }
    return config;
};
exports.onRequest = onRequest;
var onResponse = function (response) {
    var _a = response.config, method = _a.method, url = _a.url;
    var status = response.status;
    return response.data;
};
exports.onResponse = onResponse;
var onErrorResponse = function (error) {
    var _a;
    if (axios_1.default.isAxiosError(error)) {
        var message = error.message;
        var _b = error.config, method = _b.method, url = _b.url;
        var _c = (_a = error.response) !== null && _a !== void 0 ? _a : {}, statusText = _c.statusText, status = _c.status;
        switch (status) {
            case 401: {
                // "Login required"
                break;
            }
            case 403: {
                // "Permission denied"
                break;
            }
            case 404: {
                // "Invalid request"
                break;
            }
            case 500: {
                // "Server error"
                break;
            }
            default: {
                // "Unknown error occurred"
                break;
            }
        }
        if (status === 401) {
            // Delete Token & Go To Login Page if you required.
        }
    }
    else {
    }
    return Promise.reject(error);
};
exports.onErrorResponse = onErrorResponse;
