import type {
  TgUser,
  UserContextAny,
  Context as ContextTg,
  ContextOptions,
} from '@abdulgalimov/tg-framework';

export interface User extends TgUser {
  id: bigint;
  telegramId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string | null;
  langCode: string | null;
}

export type ContextAny = UserContextAny<User>;

export type Context<O extends ContextOptions> = ContextTg<O, User>;
