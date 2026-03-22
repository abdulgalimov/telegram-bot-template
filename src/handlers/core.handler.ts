import { UpdateResult } from '@abdulgalimov/telegram';

import { BaseHandler, HandlerOptions } from './base';
import { Context, ContextAny } from '../types';
import { tg } from '../tg';

export class CoreHandler extends BaseHandler {
  public constructor(options: HandlerOptions) {
    super(options);
  }

  public async update() {
    const ctx = tg.context.get();

    switch (ctx.action) {
      case tg.actions.tree.core.command:
        return await this.command(ctx as Context<{ action: typeof tg.actions.tree.core.command }>);
      case tg.actions.tree.core.inline:
        return await this.inlineQuery(
          ctx as Context<{ action: typeof tg.actions.tree.core.inline }>,
        );
      case tg.actions.tree.core.inline.select:
        return await this.inlineSelect(
          ctx as Context<{ action: typeof tg.actions.tree.core.inline.select }>,
        );
    }
  }

  private async command(ctx: Context<{ action: typeof tg.actions.tree.core.command }>) {
    const { payload } = ctx;
    switch (payload.command) {
      case '/start':
        return await this.start(ctx);
    }
  }

  private async start(ctx: ContextAny): Promise<UpdateResult> {
    return {
      redirect: {
        action: tg.actions.tree.main,
      },
    };
  }

  private async inlineQuery(
    ctx: Context<{ action: typeof tg.actions.tree.core.inline }>,
  ): Promise<UpdateResult> {}

  private async inlineSelect(
    ctx: Context<{ action: typeof tg.actions.tree.core.inline.select }>,
  ): Promise<UpdateResult> {}
}
