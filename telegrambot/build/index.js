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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_services_1 = require("./services/auth.services");
var grammy_1 = require("grammy");
var telegramBotApi_1 = require("./constants/telegramBotApi");
var handlers_1 = __importDefault(require("./handlers"));
var server_services_1 = require("./services/server.services");
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var servers, cookiesInitPromises, bot, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, server_services_1.ServerService.init()];
            case 1:
                _a.sent();
                servers = server_services_1.ServerService.servers;
                cookiesInitPromises = servers === null || servers === void 0 ? void 0 : servers.map(function (server) {
                    var _a, _b;
                    return auth_services_1.AuthServiceInstance.init(server.url, {
                        username: (_a = process.env.VPN_USERNAME) !== null && _a !== void 0 ? _a : '',
                        password: (_b = process.env.VPN_PASSWORD) !== null && _b !== void 0 ? _b : '',
                    });
                });
                if (!(cookiesInitPromises && cookiesInitPromises.length)) return [3 /*break*/, 3];
                return [4 /*yield*/, Promise.all(cookiesInitPromises)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                bot = new grammy_1.Bot(telegramBotApi_1.TG_API_KEY);
                bot.use(handlers_1.default);
                bot.catch(function (err) {
                    var ctx = err.ctx;
                    console.error("Error while handling update ".concat(ctx.update.update_id, ":"));
                    var e = err.error;
                    if (e instanceof grammy_1.GrammyError) {
                        console.error('Error in request:', e.description);
                    }
                    else if (e instanceof grammy_1.HttpError) {
                        console.error('Could not contact Telegram:', e);
                    }
                    else {
                        console.error('Unknown error:', e);
                    }
                });
                bot.start().catch(function (e) {
                    console.log(e);
                });
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
init();
