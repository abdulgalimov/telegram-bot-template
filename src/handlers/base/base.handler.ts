import { HandlerOptions } from './types';
import { Db } from '../../db';

export abstract class BaseHandler {
  protected readonly db: Db;

  public constructor(option: HandlerOptions) {
    this.db = option.db;
  }
}
