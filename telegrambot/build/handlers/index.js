"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var grammy_1 = require("grammy");
var text_event_1 = __importDefault(require("./text.event"));
var callback_event_1 = __importDefault(require("./callback.event"));
var composer = new grammy_1.Composer();
composer.use(text_event_1.default);
composer.use(callback_event_1.default);
exports.default = composer;
