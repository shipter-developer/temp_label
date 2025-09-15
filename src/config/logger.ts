// src/utils/logger.ts
import winston, { format, transports, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const { combine, timestamp, printf, colorize } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors: winston.config.AbstractConfigSetColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

// 로그 출력 포맷
const logFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    printf((info) => {
        if (info.stack) {
            return `${info.timestamp} ${info.level}: ${info.message}\nError Stack: ${info.stack}`;
        }
        return `${info.timestamp} ${info.level}: ${info.message}`;
    })
);

// 콘솔 옵션
const consoleOpts = new transports.Console({
    handleExceptions: true,
    level: 'debug',
    format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
});

/**
 * @param subDir - logs 하위 디렉토리 이름 (예: 'shopify')
 * @returns winston Logger instance
 */
export const createLogger = (subDir: string): Logger => {
    const baseLogDir = path.resolve(__dirname, '../../logs');
    const resolvedLogDir = path.join(baseLogDir, subDir);

    return winston.createLogger({
        levels,
        level: 'debug',
        format: logFormat,
        transports: [
            consoleOpts,

            new DailyRotateFile({
                level: 'error',
                datePattern: 'YYYY-MM-DD',
                dirname: path.join(resolvedLogDir, 'error'),
                filename: '%DATE%.error.log',
                maxFiles: '15d',
                zippedArchive: true,
            }),

            new DailyRotateFile({
                level: 'debug',
                datePattern: 'YYYY-MM-DD',
                dirname: path.join(resolvedLogDir, 'debug'),
                filename: '%DATE%.debug.log',
                maxFiles: '15d',
                zippedArchive: true,
            }),
        ],
    });
};