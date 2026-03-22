import type { UsersStore } from '@abdulgalimov/telegram';
import type { User } from '../../types';
import { users } from '../entities';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../entities';
import { eq } from 'drizzle-orm';

export class UsersDbService implements UsersStore<User> {
  public constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async createOrUpdate(data: {
    telegramId: number;
    firstName: string;
    lastName: string;
    langCode: string;
    username: string | null;
  }): Promise<User> {
    const fullName = (data.firstName.trim() + ' ' + data.lastName.trim()).trim();
    const [row] = await this.db
      .insert(users)
      .values({
        telegramId: data.telegramId,
        firstName: data.firstName,
        lastName: data.lastName,
        fullName,
        langCode: data.langCode,
        username: data.username,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: users.telegramId,
        set: {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          updatedAt: new Date(),
        },
      })
      .returning({
        id: users.id,
        telegramId: users.telegramId,
        firstName: users.firstName,
        lastName: users.lastName,
        username: users.username,
        langCode: users.langCode,
      });

    return {
      id: row.id,
      telegramId: row.telegramId,
      langCode: row.langCode,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName,
      username: data.username,
    };
  }

  public async updateLanguage(id: bigint, langCode: string) {
    await this.db.update(users).set({ langCode }).where(eq(users.id, id));
  }
}
