"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSuccessMenu = void 0;
var grammy_1 = require("grammy");
exports.paymentSuccessMenu = new grammy_1.InlineKeyboard()
    .text('Инструкции', 'instructionCb')
    .row()
    .text('Меню', 'toHome')
    .row();
