import type { InlineKeyboardsStore } from '@abdulgalimov/tg-framework';
import { eq, and, inArray } from 'drizzle-orm';
import { inlineKeyboards } from '../entities';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../entities';

export class InlineKeyboardsDbService implements InlineKeyboardsStore {
  public constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async create(data: { payload: string; chatId: number; contextId: string }): Promise<string> {
    const [row] = await this.db
      .insert(inlineKeyboards)
      .values({
        payload: data.payload,
        chatId: data.chatId,
        contextId: data.contextId,
      })
      .returning({ id: inlineKeyboards.id });

    return row.id;
  }

  async find(id: string): Promise<string | null> {
    const [row] = await this.db
      .select({ payload: inlineKeyboards.payload })
      .from(inlineKeyboards)
      .where(eq(inlineKeyboards.id, id));

    return row?.payload ?? null;
  }

  async deleteMessages(chatId: number, messageId: number | number[]): Promise<void> {
    const ids = Array.isArray(messageId) ? messageId : [messageId];

    await this.db
      .delete(inlineKeyboards)
      .where(and(eq(inlineKeyboards.chatId, chatId), inArray(inlineKeyboards.messageId, ids)));
  }

  async updateMessageId(contextId: string, messageId: number): Promise<void> {
    await this.db
      .update(inlineKeyboards)
      .set({ messageId })
      .where(eq(inlineKeyboards.contextId, contextId));
  }

  async deleteContext(contextId: string): Promise<void> {
    await this.db.delete(inlineKeyboards).where(eq(inlineKeyboards.contextId, contextId));
  }
}
