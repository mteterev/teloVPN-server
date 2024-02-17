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
var grammy_1 = require("grammy");
var common_1 = require("../messages/common");
var newUserMain_menu_1 = require("../keyboards/newUserMain.menu");
var user_1 = require("../api/user");
var user_enum_1 = require("../enums/user.enum");
var getExpirationTime_1 = require("../functions/getExpirationTime");
var user_2 = require("../api/vpn/user");
var getInbound_1 = require("../api/vpn/getInbound");
var lk_menu_1 = require("../keyboards/lk.menu");
var paymentSuccess_menu_1 = require("../keyboards/paymentSuccess.menu");
var getTimeToEnd_1 = require("../functions/getTimeToEnd");
var getKey_1 = require("../functions/getKey");
var composer = new grammy_1.Composer();
composer.command('start', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var user, message;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, user_1.getUser)(ctx.msg.chat.id)];
            case 1:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, user_1.createUser)({ user_id: ctx.msg.chat.id })];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                if (!(user.role === user_enum_1.EUserRole.CLIENT)) return [3 /*break*/, 5];
                message = common_1.messages.helloAgain;
                message = message.replace('{name}', ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.username) || 'дорогой клиент');
                message = message.replace('{timeToEnd}', "".concat((0, getTimeToEnd_1.getTimeToEnd)(user.expiration_time).toString(), " \u0434\u043D\u0435\u0439."));
                return [4 /*yield*/, ctx.reply(message, {
                        reply_markup: lk_menu_1.clientMenu,
                    })];
            case 4:
                _b.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, ctx.reply(common_1.messages.helloMessage, {
                    reply_markup: newUserMain_menu_1.menuNewUserMain,
                })];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
composer.on('pre_checkout_query', function (ctx) {
    ctx.api.answerPreCheckoutQuery(ctx.preCheckoutQuery.id, true);
});
composer.on(':successful_payment', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, expiration_time, user, expiration_time, user, inbound, userServer, key, message;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                if (!ctx.update.message) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, user_1.getUser)((_a = ctx.update.message) === null || _a === void 0 ? void 0 : _a.from.id)];
            case 1:
                currentUser = _j.sent();
                if (!(currentUser.role === user_enum_1.EUserRole.CLIENT)) return [3 /*break*/, 5];
                expiration_time = (0, getExpirationTime_1.getExpirationTime)({
                    startDate: currentUser.expiration_time,
                    tariff: (_b = ctx.update.message) === null || _b === void 0 ? void 0 : _b.successful_payment.invoice_payload,
                });
                return [4 /*yield*/, (0, user_1.updateUser)({
                        user_id: (_c = ctx.update.message) === null || _c === void 0 ? void 0 : _c.from.id,
                        expiration_time: expiration_time,
                    })];
            case 2:
                user = _j.sent();
                return [4 /*yield*/, (0, user_2.updateClient)(user)];
            case 3:
                _j.sent();
                return [4 /*yield*/, ctx.api.sendMessage((_d = ctx.update.message) === null || _d === void 0 ? void 0 : _d.from.id, common_1.messages.paymentSuccessOld, {
                        reply_markup: lk_menu_1.clientMenu,
                    })];
            case 4:
                _j.sent();
                return [3 /*break*/, 12];
            case 5:
                expiration_time = (0, getExpirationTime_1.getExpirationTime)({
                    tariff: (_e = ctx.update.message) === null || _e === void 0 ? void 0 : _e.successful_payment.invoice_payload,
                });
                return [4 /*yield*/, (0, user_1.updateUserAfterFirstPay)({
                        user_id: (_f = ctx.update.message) === null || _f === void 0 ? void 0 : _f.from.id,
                        expiration_time: expiration_time,
                    })];
            case 6:
                user = _j.sent();
                return [4 /*yield*/, (0, user_2.addNewClient)(user)];
            case 7:
                _j.sent();
                return [4 /*yield*/, (0, getInbound_1.getInbound)(user)];
            case 8:
                inbound = _j.sent();
                if (!inbound) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, user_1.getUserServer)((_g = ctx.update.message) === null || _g === void 0 ? void 0 : _g.from.id)];
            case 9:
                userServer = _j.sent();
                return [4 /*yield*/, (0, getKey_1.getKey)({ ctx: ctx, inbound: inbound, userServer: userServer.url })];
            case 10:
                key = _j.sent();
                message = common_1.messages.paymentSuccess;
                message = message.replace('{vpnKey}', "<code>".concat(key, "</code>"));
                return [4 /*yield*/, ctx.api.sendMessage((_h = ctx.update.message) === null || _h === void 0 ? void 0 : _h.from.id, message, {
                        reply_markup: paymentSuccess_menu_1.paymentSuccessMenu,
                        parse_mode: 'HTML',
                    })];
            case 11:
                _j.sent();
                _j.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); });
exports.default = composer;
