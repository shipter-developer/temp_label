"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
// src/utils/logger.ts
const winston_1 = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const { combine, timestamp, printf, colorize } = winston_1.format;
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};
winston_1.default.addColors(colors);
// 로그 출력 포맷
const logFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), printf((info) => {
    if (info.stack) {
        return `${info.timestamp} ${info.level}: ${info.message}\nError Stack: ${info.stack}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
}));
// 콘솔 옵션
const consoleOpts = new winston_1.transports.Console({
    handleExceptions: true,
    level: 'debug',
    format: combine(colorize({ all: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
});
/**
 * @param subDir - logs 하위 디렉토리 이름 (예: 'shopify')
 * @returns winston Logger instance
 */
const createLogger = (subDir) => {
    const baseLogDir = path_1.default.resolve(__dirname, '../../logs');
    const resolvedLogDir = path_1.default.join(baseLogDir, subDir);
    return winston_1.default.createLogger({
        levels,
        level: 'debug',
        format: logFormat,
        transports: [
            consoleOpts,
            new winston_daily_rotate_file_1.default({
                level: 'error',
                datePattern: 'YYYY-MM-DD',
                dirname: path_1.default.join(resolvedLogDir, 'error'),
                filename: '%DATE%.error.log',
                maxFiles: '15d',
                zippedArchive: true,
            }),
            new winston_daily_rotate_file_1.default({
                level: 'debug',
                datePattern: 'YYYY-MM-DD',
                dirname: path_1.default.join(resolvedLogDir, 'debug'),
                filename: '%DATE%.debug.log',
                maxFiles: '15d',
                zippedArchive: true,
            }),
        ],
    });
};
exports.createLogger = createLogger;
