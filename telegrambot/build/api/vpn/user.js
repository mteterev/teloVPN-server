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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClient = exports.addNewClient = void 0;
var axios_1 = require("../../plugins/axios");
var server_services_1 = require("../../services/server.services");
var addNewClient = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var response, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.axiosVPNInstance.post("".concat((_a = server_services_1.ServerService.userServer(user.server)) === null || _a === void 0 ? void 0 : _a.url, "/panel/api/inbounds/addClient"), {
                        id: 1,
                        settings: "{\"clients\":[{\"email\":\"".concat(user.user_id, "\",\"totalGB\":215000000000,\"expiryTime\":").concat(new Date(user.expiration_time).getTime(), ",\"enable\":true,\"flow\":\"xtls-rprx-vision\",\"subId\": \"").concat(user.subid, "\",\"limitip\":3,\"id\":\"").concat(user.uuid, "\"}]}"),
                    })];
            case 1:
                response = _b.sent();
                return [2 /*return*/, response];
            case 2:
                e_1 = _b.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addNewClient = addNewClient;
var updateClient = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var response, e_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.axiosVPNInstance.post("".concat((_a = server_services_1.ServerService.userServer(user.server)) === null || _a === void 0 ? void 0 : _a.url, "/panel/api/inbounds/updateClient/").concat(user.uuid), {
                        id: 1,
                        settings: "{\"clients\":[{\"email\":\"".concat(user.user_id, "\",\"totalGB\":215000000000,\"expiryTime\":").concat(new Date(user.expiration_time).getTime(), ",\"enable\":true,\"flow\":\"xtls-rprx-vision\",\"subId\": \"").concat(user.subid, "\",\"limitip\":3,\"id\":\"").concat(user.uuid, "\"}]}"),
                    })];
            case 1:
                response = _b.sent();
                return [2 /*return*/, response];
            case 2:
                e_2 = _b.sent();
                console.log(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateClient = updateClient;
