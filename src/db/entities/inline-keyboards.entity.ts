import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const inlineKeyboards = pgTable('inline_keyboards', {
  id: uuid('id').primaryKey().defaultRandom(),
  payload: text('payload').notNull(),
  chatId: integer('chat_id').notNull(),
  contextId: text('context_id').notNull(),
  messageId: integer('message_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
