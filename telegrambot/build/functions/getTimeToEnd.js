"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeToEnd = void 0;
var getTimeToEnd = function (expiration_time) {
    var currentTime = new Date();
    var expTime = new Date(expiration_time);
    if (expTime > currentTime) {
        //@ts-ignore
        var diffTime = Math.abs(expTime - currentTime);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
    return 0;
};
exports.getTimeToEnd = getTimeToEnd;
