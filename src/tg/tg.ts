import { Telegram } from '@abdulgalimov/telegram';

import { User } from '../types';
import { LocaleKeysType } from '../locales/generated/locale-types';
import { actionsTree } from './actions-tree';
import { telegramConfig } from '../config';
import { ConsoleLoggerFactory } from '../utils/logger';

export const tg = new Telegram<{
  user: User;
  locale: LocaleKeysType;
  tree: typeof actionsTree;
}>({
  config: telegramConfig,
  actionsTree,
  loggerFactory: new ConsoleLoggerFactory(),
});
