import type { TgLogger, TgLoggerFactory } from '@abdulgalimov/tg-framework';

const LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
} as const;

const logLevelValues: Record<string, number> = {
  [LogLevel.ERROR]: 0,
  [LogLevel.WARN]: 1,
  [LogLevel.INFO]: 2,
  [LogLevel.DEBUG]: 3,
};

class ConsoleLogger implements TgLogger {
  private level: string = 'error';

  constructor(private readonly name: string) {}

  error(message: string, meta?: unknown): void {
    console.error(`[${this.name}] ERROR:`, message, meta ?? '');
  }

  warn(message: string, meta?: unknown): void {
    if (!logLevelValues[this.level] || logLevelValues[this.level] > 1) return;
    console.warn(`[${this.name}] WARN:`, message, meta ?? '');
  }

  info(message: string, meta?: unknown): void {
    if (!logLevelValues[this.level] || logLevelValues[this.level] > 2) return;
    console.info(`[${this.name}] INFO:`, message, meta ?? '');
  }

  debug(message: string, meta?: unknown): void {
    if (!logLevelValues[this.level] || logLevelValues[this.level] > 3) return;
    console.debug(`[${this.name}] DEBUG:`, message, meta ?? '');
  }

  setLogLevel(level: string): void {
    this.level = level;
  }
}

export class ConsoleLoggerFactory implements TgLoggerFactory {
  create(name: string): TgLogger {
    return new ConsoleLogger(name);
  }
}
