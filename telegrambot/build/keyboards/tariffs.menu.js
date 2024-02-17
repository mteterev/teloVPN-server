"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuTariffs = void 0;
var grammy_1 = require("grammy");
var tariffs_enum_1 = require("../enums/tariffs.enum");
exports.menuTariffs = new grammy_1.InlineKeyboard()
    .text('1 мес', tariffs_enum_1.ETariffs.MONTH1)
    .text('2 мес', tariffs_enum_1.ETariffs.MONTH2).row()
    .text('3 мес', tariffs_enum_1.ETariffs.MONTH3)
    .text('6 мес', tariffs_enum_1.ETariffs.MONTH6).row()
    .text('12 мес', tariffs_enum_1.ETariffs.MONTH12).row()
    .text('Меню', 'toHome').row();
