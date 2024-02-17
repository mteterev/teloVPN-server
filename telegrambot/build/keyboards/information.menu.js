"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuInformation = void 0;
var grammy_1 = require("grammy");
exports.menuInformation = new grammy_1.InlineKeyboard()
    .text('Получить доступ', 'getAccessCb').row()
    .text('Инструкция', 'instructionCb').row()
    .text('Меню', 'toHome').row();
