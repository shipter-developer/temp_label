"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const config_1 = __importDefault(require("./config"));
const pool = (0, promise_1.createPool)({
    host: config_1.default.host,
    database: config_1.default.database,
    user: config_1.default.user,
    password: config_1.default.password,
    connectTimeout: 5000,
    connectionLimit: 30 //default 10
});
exports.default = pool;
