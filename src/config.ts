import type { TelegramConfig } from '@abdulgalimov/tg-framework';

export const telegramConfig: TelegramConfig = {
  apiUrl: process.env.TELEGRAM_API_URL || 'https://api.telegram.org',
  token: process.env.BOT_TOKEN || '',
  debug: {
    payloadDecoderLevel: process.env.TG_DECODE_LOG_LEVEL || 'debug',
    telegramCallServiceLevel: process.env.TG_CALL_LOG_LEVEL || 'debug',
    telegramUpdateLevel: process.env.TG_UPDATE_LOG_LEVEL || 'debug',
  },
};

export const dbConfig = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'tg_template',
};

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0', 10),
};
