import { BaseHandler, HandlerOptions } from './base';
import { CoreHandler } from './core.handler';
import { MainHandler } from './main.handler';
import { tg } from '../tg';
import { ProfileHandler } from './profile';

export class BotHandler extends BaseHandler {
  private readonly coreHandler: CoreHandler;

  private readonly mainHandler: MainHandler;

  private readonly profileHandler: ProfileHandler;

  public constructor(handlerOptions: HandlerOptions) {
    super(handlerOptions);

    this.coreHandler = new CoreHandler(handlerOptions);

    this.mainHandler = new MainHandler(handlerOptions);

    this.profileHandler = new ProfileHandler(handlerOptions);
  }

  public async update() {
    const ctx = tg.context.get();

    if (ctx.action.meta.childOf(tg.actions.tree.core)) {
      return await this.coreHandler.update();
    }

    if (ctx.action.meta.childOf(tg.actions.tree.main)) {
      return await this.mainHandler.update();
    }

    if (ctx.action.meta.childOf(tg.actions.tree.profile)) {
      return await this.profileHandler.update();
    }
  }
}
