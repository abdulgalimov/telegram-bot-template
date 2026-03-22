import { ReplyButtonPayload } from '@abdulgalimov/telegram';
import { integer, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { Static } from '@sinclair/typebox';

export const replyKeyboards = pgTable('reply_keyboards', {
  id: uuid('id').primaryKey().defaultRandom(),
  text: varchar('label').notNull(),
  buttons: jsonb('buttons').$type<ReplyButtonPayload[]>().notNull(),
  chatId: integer('chat_id').notNull(),
  messageId: integer('message_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const ReplyKeyboardSelect = createSelectSchema(replyKeyboards);
export type ReplyKeyboardSelect = Static<typeof ReplyKeyboardSelect>;

export const ReplyKeyboardInsert = createInsertSchema(replyKeyboards);
export type ReplyKeyboardInsert = Static<typeof ReplyKeyboardInsert>;
