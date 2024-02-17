"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructionsMenu = void 0;
var grammy_1 = require("grammy");
exports.instructionsMenu = new grammy_1.InlineKeyboard()
    .text('Инструкция iOS/MacOS', 'instructionMacOsCb')
    .row()
    .text('Инструкция Android', 'instructionAndroidCb')
    .row()
    .text('Инструкция Windows', 'instructionWindowsCb')
    .row()
    .text('Меню', 'toHome')
    .row();
