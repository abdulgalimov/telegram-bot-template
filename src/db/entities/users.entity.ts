import { pgTable, bigserial, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { Static } from '@sinclair/typebox';

export const users = pgTable('users', {
  id: bigserial('id', { mode: 'bigint' }).primaryKey(),
  telegramId: integer('telegram_id').notNull().unique(),
  firstName: text('first_name').notNull().default(''),
  lastName: text('last_name').notNull().default(''),
  fullName: text('full_name').notNull().default(''),
  langCode: text('lang_code'),
  username: text('username'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const UserSelect = createSelectSchema(users);
export type UserSelect = Static<typeof UserSelect>;

export const UserInsert = createInsertSchema(users);
export type UserInsert = Static<typeof UserInsert>;
