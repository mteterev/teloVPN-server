"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpirationTime = void 0;
var getExpirationTime = function (_a) {
    var startDate = _a.startDate, tariff = _a.tariff;
    var month = Number(tariff.split('month')[0]);
    var expiration_time = new Date(startDate || '');
    if (startDate && expiration_time > new Date()) {
        expiration_time.setMonth(expiration_time.getMonth() + month);
        return expiration_time.getTime();
    }
    else {
        var startedDate = new Date();
        startedDate.setMonth(startedDate.getMonth() + month);
        return startedDate.getTime();
    }
};
exports.getExpirationTime = getExpirationTime;
