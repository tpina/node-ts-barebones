import * as fs from 'fs';
import * as winston from 'winston';
import * as chalk from 'chalk';
import * as PrettyError from 'pretty-error'; // it's really handy to make your life easier
import { LoggerOptions } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export class Logger {
  private readonly logger: winston.Logger;
  private readonly prettyError = new PrettyError();

  static logDir = 'logs';
  static env = process.env.NODE_ENV || 'development';

  private static loggerOptions: LoggerOptions = {
    transports: [
      new DailyRotateFile({
        dirname: 'logs',
        filename: '%DATE%-stderr.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
      }),
      new DailyRotateFile({
        dirname: 'logs',
        filename: '%DATE%-stdout.log',
        datePattern: 'YYYY-MM-DD',
        level: Logger.env === 'development' ? 'verbose' : 'info',
      }),
    ],
  };

  private static createLogFolderIfNeeded(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }
  constructor(private context: string, transport?) {
    Logger.createLogFolderIfNeeded();

    this.logger = winston.createLogger(Logger.loggerOptions);
    this.prettyError.skipNodeFiles();
    this.prettyError.skipPackage('express', '@nestjs/common', '@nestjs/core');
  }

  static configGlobal(options?: LoggerOptions) {
    this.loggerOptions = options;
  }

  log(message: string): void {
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formatedLog('info', message);
  }

  error(message: string, trace?: any): void {
    const currentDate = new Date();
    // i think the trace should be JSON Stringified
    this.logger.error(`${message} -> (${trace || 'trace not provided !'})`, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formatedLog('error', message, trace);
  }

  warn(message: string): void {
    const currentDate = new Date();
    this.logger.warn(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formatedLog('warn', message);
  }
  overrideOptions(options: LoggerOptions) {
    this.logger.configure(options);
  }

  // this method just for printing a cool log in your terminal , using chalk
  private formatedLog(level: string, message: string, error?): void {
    let result = '';
    const color = chalk.default;
    const currentDate = new Date();
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    switch (level) {
      case 'info':
        result = `[${color.blue('INFO')}] ${color.yellow.bold(
          time,
        )} [${color.green(this.context)}] ${message}`;
        break;
      case 'error':
        result = `[${color.red('ERR')}] ${color.yellow.bold(
          time,
        )} [${color.green(this.context)}] ${message}`;
        if (error && Logger.env === 'development') {
          this.prettyError.render(error, true);
        }

        break;
      case 'warn':
        result = `[${color.yellow('WARN')}] ${color.yellow.bold(
          time,
        )} [${color.green(this.context)}] ${message}`;
        break;
      default:
        break;
    }
    // tslint:disable-next-line:no-console
    console.log(result);
  }
}
