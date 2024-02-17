"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKey = void 0;
var getKey = function (_a) {
    var ctx = _a.ctx, inbound = _a.inbound, userServer = _a.userServer;
    return __awaiter(void 0, void 0, void 0, function () {
        var inboundsSettings, inboundsStreamSettings, userId, userName, flow, remark, pbKey, fp, sid, security, network, sni, serverUrl, vpnKey;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        return __generator(this, function (_x) {
            inboundsSettings = JSON.parse((_b = inbound === null || inbound === void 0 ? void 0 : inbound.obj) === null || _b === void 0 ? void 0 : _b.settings);
            inboundsStreamSettings = JSON.parse((_c = inbound === null || inbound === void 0 ? void 0 : inbound.obj) === null || _c === void 0 ? void 0 : _c.streamSettings);
            userId = (_e = (_d = inboundsSettings === null || inboundsSettings === void 0 ? void 0 : inboundsSettings.clients) === null || _d === void 0 ? void 0 : _d.find(function (item) { return item.email == ctx.from.id; })) === null || _e === void 0 ? void 0 : _e.id;
            userName = (_g = (_f = inboundsSettings === null || inboundsSettings === void 0 ? void 0 : inboundsSettings.clients) === null || _f === void 0 ? void 0 : _f.find(function (item) { return item.email == ctx.from.id; })) === null || _g === void 0 ? void 0 : _g.email;
            flow = (_j = (_h = inboundsSettings === null || inboundsSettings === void 0 ? void 0 : inboundsSettings.clients) === null || _h === void 0 ? void 0 : _h.find(function (item) { return item.email == ctx.from.id; })) === null || _j === void 0 ? void 0 : _j.flow;
            remark = (_k = inbound === null || inbound === void 0 ? void 0 : inbound.obj) === null || _k === void 0 ? void 0 : _k.remark;
            pbKey = (_m = (_l = inboundsStreamSettings === null || inboundsStreamSettings === void 0 ? void 0 : inboundsStreamSettings.realitySettings) === null || _l === void 0 ? void 0 : _l.settings) === null || _m === void 0 ? void 0 : _m.publicKey;
            fp = (_p = (_o = inboundsStreamSettings === null || inboundsStreamSettings === void 0 ? void 0 : inboundsStreamSettings.realitySettings) === null || _o === void 0 ? void 0 : _o.settings) === null || _p === void 0 ? void 0 : _p.fingerprint;
            sid = (_r = (_q = inboundsStreamSettings === null || inboundsStreamSettings === void 0 ? void 0 : inboundsStreamSettings.realitySettings) === null || _q === void 0 ? void 0 : _q.shortIds) === null || _r === void 0 ? void 0 : _r[0];
            security = inboundsStreamSettings === null || inboundsStreamSettings === void 0 ? void 0 : inboundsStreamSettings.security;
            network = inboundsStreamSettings === null || inboundsStreamSettings === void 0 ? void 0 : inboundsStreamSettings.network;
            sni = (_t = (_s = inboundsStreamSettings === null || inboundsStreamSettings === void 0 ? void 0 : inboundsStreamSettings.realitySettings) === null || _s === void 0 ? void 0 : _s.serverNames) === null || _t === void 0 ? void 0 : _t[0];
            serverUrl = (_w = (_v = (_u = userServer === null || userServer === void 0 ? void 0 : userServer.split('/')) === null || _u === void 0 ? void 0 : _u[2]) === null || _v === void 0 ? void 0 : _v.split(':')) === null || _w === void 0 ? void 0 : _w[0];
            console.log(serverUrl);
            if (userId &&
                userName &&
                flow &&
                remark &&
                pbKey &&
                fp &&
                sid &&
                security &&
                network &&
                serverUrl) {
                vpnKey = "vless://".concat(userId, "@").concat(serverUrl, ":433?type=").concat(network, "&security=").concat(security, "&pbk=").concat(pbKey, "&fp=").concat(fp, "&sni=").concat(sni, "&sid=").concat(sid, "&spx=%2F&flow=").concat(flow, "#").concat(remark, "-").concat(userName);
                return [2 /*return*/, vpnKey];
            }
            return [2 /*return*/];
        });
    });
};
exports.getKey = getKey;
