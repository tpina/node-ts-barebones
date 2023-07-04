import fs from 'fs';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import chalk from 'chalk';
import PrettyError from 'pretty-error'; // it's really handy to make your life easier
import { LoggerOptions } from 'winston';

export class Logger {
  private readonly logger: winston.Logger;
  private readonly prettyError = new PrettyError();

  static logDir = 'logs';
  static env = process.env.NODE_ENV || 'development';

  private static loggerOptions: LoggerOptions = {
    transports: [
      new winston.transports.DailyRotateFile({
        dirname: 'logs',
        filename: '%DATE%-stderr.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
      }),
      new winston.transports.DailyRotateFile({
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
  constructor(private context: string) {
    Logger.createLogFolderIfNeeded();

    this.logger = winston.createLogger(Logger.loggerOptions);
    this.prettyError.skipNodeFiles();
    this.prettyError.skipPackage('express', '@nestjs/common', '@nestjs/core');
  }

  static configGlobal(options?: LoggerOptions) {
    if (options) {
      this.loggerOptions = options;
    }
  }

  log(message: string): void {
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formattedLog('info', message);
  }

  error(message: string, trace?: any): void {
    const currentDate = new Date();
    // i think the trace should be JSON Stringified
    this.logger.error(`${message} -> (${trace || 'trace not provided !'})`, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formattedLog('error', message, trace);
  }

  warn(message: string): void {
    const currentDate = new Date();
    this.logger.warn(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formattedLog('warn', message);
  }
  overrideOptions(options: LoggerOptions) {
    this.logger.configure(options);
  }

  // this method just for printing a cool log in your terminal , using chalk
  private formattedLog(
    level: string,
    message: string,
    error?: PrettyError.ParsedError,
  ): void {
    let result = '';
    const currentDate = new Date();
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    switch (level) {
      case 'info':
        result = `[${chalk.blue('INFO')}] ${chalk.yellow.bold(
          time,
        )} [${chalk.green(this.context)}] ${message}`;
        break;
      case 'error':
        result = `[${chalk.red('ERR')}] ${chalk.yellow.bold(
          time,
        )} [${chalk.green(this.context)}] ${message}`;
        if (error && Logger.env === 'development') {
          this.prettyError.render(error, true);
        }

        break;
      case 'warn':
        result = `[${chalk.yellow('WARN')}] ${chalk.yellow.bold(
          time,
        )} [${chalk.green(this.context)}] ${message}`;
        break;
      default:
        break;
    }
    // tslint:disable-next-line:no-console
    console.log(result);
  }
}
