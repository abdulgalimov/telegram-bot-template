import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { dbConfig } from '../config';
import * as schema from './entities';
import {
  ActionsDbService,
  InlineKeyboardsDbService,
  ReplyKeyboardsDbService,
  UsersDbService,
} from './services';

export class Db {
  private readonly pool: Pool;
  private readonly db: NodePgDatabase<typeof schema>;

  public readonly actions: ActionsDbService;

  public readonly users: UsersDbService;

  public readonly inlineKeyboards: InlineKeyboardsDbService;

  public readonly replyKeyboards: ReplyKeyboardsDbService;

  public constructor() {
    this.pool = new Pool(dbConfig);

    this.db = drizzle(this.pool, { schema });

    this.actions = new ActionsDbService(this.db);

    this.users = new UsersDbService(this.db);

    this.inlineKeyboards = new InlineKeyboardsDbService(this.db);

    this.replyKeyboards = new ReplyKeyboardsDbService(this.db);
  }
}
