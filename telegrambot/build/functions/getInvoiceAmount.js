"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceAmount = void 0;
var tariffs_enum_1 = require("../enums/tariffs.enum");
var getInvoiceAmount = function (tariff) {
    switch (tariff) {
        case tariffs_enum_1.ETariffs.MONTH1:
            return 20000;
        case tariffs_enum_1.ETariffs.MONTH2:
            return 40000;
        case tariffs_enum_1.ETariffs.MONTH3:
            return 55000;
        case tariffs_enum_1.ETariffs.MONTH6:
            return 90000;
        case tariffs_enum_1.ETariffs.MONTH12:
            return 180000;
        default:
            return 0;
    }
};
exports.getInvoiceAmount = getInvoiceAmount;
