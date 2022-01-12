const winston = require('winston');
const format = winston.format;

const levels = {

    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};

const newFormat = format.printf(({ level, message, timestamp }) => {

    return `${timestamp} => ${level}: ${message}`;
});

const logger = winston.createLogger({

    levels: levels,
    format: format.combine(
        format.timestamp(),
        newFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log', level: 'silly' }),
        new winston.transports.File({ filename: 'errors.log', level: 'warn' }),
        new winston.transports.File({ filename: 'http.log', level: 'http' })
    ]
});

module.exports = logger;