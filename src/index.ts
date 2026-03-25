import 'dotenv/config';
import { telegramConfig } from './config';
import { TelegramStore } from '@abdulgalimov/telegram';
import { User } from './types';
import { RedisKvStore } from './redis';
import { tg } from './tg';
import * as fs from 'node:fs';
import { db } from './db';
import './handlers';

async function main() {
  if (!telegramConfig.token) {
    console.error('BOT_TOKEN is required. Set it in .env file.');
    process.exit(1);
  }

  const store: TelegramStore<User> = {
    actions: db.actions,
    users: db.users,
    inlineKeyboards: db.inlineKeyboards,
    replyKeyboards: db.replyKeyboards,
  };
  const kv = new RedisKvStore();

  tg.create({
    store,
    locale: {
      locales: [
        {
          code: 'ru',
          text: fs.readFileSync('./src/locales/ru.txt', 'utf-8'),
        },
        {
          code: 'en',
          text: fs.readFileSync('./src/locales/en.txt', 'utf-8'),
        },
      ],
      defaultLocale: 'ru',
    },
    kv,
  });

  await tg.init(async () => {
    const ctx = tg.context.get();
    console.log('unknown handler', {
      action: ctx.action.meta.fullKey,
    });
  });

  tg.update.startLongpoll();

  const shutdown = async () => {
    console.log('Stopping bot...');
    await kv.stop();
    tg.stop();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((err) => {
  console.error('Failed to start bot:', err);
  process.exit(1);
});
