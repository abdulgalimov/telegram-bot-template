import 'dotenv/config';
import { telegramConfig } from './config';
import { Db } from './db';
import { TelegramStore } from '@abdulgalimov/tg-framework';
import { User } from './types';
import { RedisKvStore } from './redis';
import { tg } from './tg';
import * as fs from 'node:fs';
import { BotHandler, HandlerOptions } from './handlers';

async function main() {
  if (!telegramConfig.token) {
    console.error('BOT_TOKEN is required. Set it in .env file.');
    process.exit(1);
  }

  const db = new Db();

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

  const options: HandlerOptions = {
    db,
  };

  const botHandler = new BotHandler(options);

  await tg.init(() => botHandler.update());

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
