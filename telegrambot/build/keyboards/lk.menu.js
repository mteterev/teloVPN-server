"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientMenu = void 0;
var grammy_1 = require("grammy");
var common_1 = require("../constants/common");
exports.clientMenu = new grammy_1.InlineKeyboard()
    .text('Продлить доступ', 'getAccessCb')
    .row()
    .text('Заново получить ключ', 'getVPNKeyAgainCb')
    .row()
    .text('Инструкция', 'instructionCb')
    .row()
    .url('Поддержка', common_1.helpUrl)
    .row();
