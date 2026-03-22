import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const actions = pgTable('actions', {
  id: serial('id').primaryKey(),
  path: text('path').notNull().unique(),
});
