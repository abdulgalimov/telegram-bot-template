import { eq } from 'drizzle-orm';
import type { ReplyButtonPayload, ReplyKeyboardsStore } from '@abdulgalimov/telegram';
import * as schema from '../entities';
import { replyKeyboards } from '../entities';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ReplyKeyboardSelect } from '../entities/reply-keyboards.entity';

export class ReplyKeyboardsDbService implements ReplyKeyboardsStore {
  public constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  public async delete(chatId: number) {
    await this.db.delete(replyKeyboards).where(eq(replyKeyboards.chatId, chatId));
  }

  async create(chatId: number, messageId: number, text: string, buttons: ReplyButtonPayload[]) {
    await this.db
      .insert(replyKeyboards)
      .values({
        chatId,
        messageId,
        text,
        buttons,
      })
      .returning({ id: replyKeyboards.id });
  }

  async find(chatId: number): Promise<ReplyKeyboardSelect> {
    const [row] = await this.db
      .select()
      .from(replyKeyboards)
      .where(eq(replyKeyboards.chatId, chatId));

    return row;
  }
}
