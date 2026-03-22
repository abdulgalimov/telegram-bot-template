import type { ActionsStore } from '@abdulgalimov/tg-framework';
import { actions } from '../entities';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../entities';

export class ActionsDbService implements ActionsStore {
  public constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async createAll(pathList: string[]): Promise<{ path: string; id: number }[]> {
    const results: { path: string; id: number }[] = [];

    for (const path of pathList) {
      const [row] = await this.db
        .insert(actions)
        .values({ path })
        .onConflictDoUpdate({
          target: actions.path,
          set: { path },
        })
        .returning({
          id: actions.id,
          path: actions.path,
        });

      results.push({ path: row.path, id: row.id });
    }

    return results;
  }
}
