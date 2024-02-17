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
var tariffs_menu_1 = require("../keyboards/tariffs.menu");
var common_1 = require("../messages/common");
var instructions_menu_1 = require("../keyboards/instructions.menu");
var information_menu_1 = require("../keyboards/information.menu");
var newUserMain_menu_1 = require("../keyboards/newUserMain.menu");
var editMessage_1 = require("../helpers/editMessage");
var user_1 = require("../api/user");
var user_enum_1 = require("../enums/user.enum");
var lk_menu_1 = require("../keyboards/lk.menu");
var getTimeToEnd_1 = require("../functions/getTimeToEnd");
var createInvoice_1 = require("../helpers/createInvoice");
var getInvoiceAmount_1 = require("../functions/getInvoiceAmount");
var toHome_menu_1 = require("../keyboards/toHome.menu");
var getKey_1 = require("../functions/getKey");
var getInbound_1 = require("../api/vpn/getInbound");
var composer = new grammy_1.Composer();
composer.callbackQuery('getAccessCb', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, editMessage_1.editMessage)({
                    ctx: ctx,
                    text: common_1.messages.tariffs.description,
                    keyboard: tariffs_menu_1.menuTariffs,
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
composer.callbackQuery('informationCb', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, editMessage_1.editMessage)({
                    ctx: ctx,
                    text: common_1.messages.information,
                    keyboard: information_menu_1.menuInformation,
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
composer.callbackQuery('instructionCb', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, editMessage_1.editMessage)({
                    ctx: ctx,
                    keyboard: instructions_menu_1.instructionsMenu,
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
composer.callbackQuery('getVPNKeyAgainCb', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userServer, inbound, key;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, user_1.getUser)(ctx.from.id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (0, user_1.getUserServer)(ctx.from.id)];
            case 2:
                userServer = _a.sent();
                return [4 /*yield*/, (0, getInbound_1.getInbound)(user)];
            case 3:
                inbound = _a.sent();
                return [4 /*yield*/, (0, getKey_1.getKey)({ ctx: ctx, inbound: inbound, userServer: userServer.url })];
            case 4:
                key = _a.sent();
                return [4 /*yield*/, (0, editMessage_1.editMessage)({
                        ctx: ctx,
                        text: "<code>".concat(key, "</code>"),
                        keyboard: toHome_menu_1.toHomeMenu,
                    })];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
composer.callbackQuery('toHome', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var user, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, user_1.getUser)(ctx.from.id)];
            case 1:
                user = _a.sent();
                if (!(user.role === user_enum_1.EUserRole.CLIENT)) return [3 /*break*/, 3];
                message = common_1.messages.helloAgain;
                message = message.replace('{name}', ctx.from.username || 'дорогой клиент');
                message = message.replace('{timeToEnd}', "".concat((0, getTimeToEnd_1.getTimeToEnd)(user.expiration_time).toString(), " \u0434\u043D\u0435\u0439."));
                return [4 /*yield*/, (0, editMessage_1.editMessage)({
                        ctx: ctx,
                        text: message,
                        keyboard: lk_menu_1.clientMenu,
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!(user.role === user_enum_1.EUserRole.USER)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, editMessage_1.editMessage)({
                        ctx: ctx,
                        text: common_1.messages.helloMessage,
                        keyboard: newUserMain_menu_1.menuNewUserMain,
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
composer.callbackQuery(/month/g, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var tariff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tariff = ctx.update.callback_query.data;
                if (tariff && (0, getInvoiceAmount_1.getInvoiceAmount)(tariff)) {
                    (0, createInvoice_1.createInvoice)({ ctx: ctx, payload: tariff, amount: (0, getInvoiceAmount_1.getInvoiceAmount)(tariff) });
                }
                return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
composer.callbackQuery(/instruction/g, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var instruction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                instruction = ctx.update.callback_query.data;
                if (instruction === 'instructionAndroidCb') {
                    (0, editMessage_1.editMessage)({
                        ctx: ctx,
                        text: common_1.messages.instructionAndroid,
                        keyboard: toHome_menu_1.toHomeMenu,
                    });
                }
                if (instruction === 'instructionMacOsCb') {
                    (0, editMessage_1.editMessage)({ ctx: ctx, text: common_1.messages.instructionMacOs, keyboard: toHome_menu_1.toHomeMenu });
                }
                if (instruction === 'instructionWindowsCb') {
                    (0, editMessage_1.editMessage)({
                        ctx: ctx,
                        text: common_1.messages.instructionWindows,
                        keyboard: toHome_menu_1.toHomeMenu,
                    });
                }
                return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.default = composer;
