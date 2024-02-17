"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuNewUserMain = void 0;
var grammy_1 = require("grammy");
var common_1 = require("../constants/common");
exports.menuNewUserMain = new grammy_1.InlineKeyboard()
    .text('Получить доступ', 'getAccessCb')
    .row()
    .text('Информация', 'informationCb')
    .row()
    .url('Поддержка', common_1.helpUrl)
    .row();
