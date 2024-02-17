"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoice = void 0;
require("dotenv/config");
var createInvoice = function (_a) {
    var _b;
    var ctx = _a.ctx, payload = _a.payload, amount = _a.amount;
    ctx.api.sendInvoice(ctx.from.id, 'Оплата VPN сервера', "".concat(payload.split('month')[0], " \u043C\u0435\u0441\u044F\u0446(\u0435\u0432); 200 \u0433\u0431/\u043C\u0435\u0441"), payload, (_b = process.env.API_KEY_PROVIDER_BOT) !== null && _b !== void 0 ? _b : '', 'rub', [{ label: 'TeloVPN', amount: amount }]);
};
exports.createInvoice = createInvoice;
