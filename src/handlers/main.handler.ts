import { BaseHandler } from './base';
import { ContextAny } from '../types';
import { tg } from '../tg';

export class MainHandler extends BaseHandler {
  public async update() {
    const ctx = tg.context.get();

    switch (ctx.action) {
      case tg.actions.tree.main:
        return await this.main(ctx);
    }
  }

  private async main(ctx: ContextAny) {
    const { user } = ctx;
    await tg.request.reply({
      text: tg.locale.text('main-menu', {
        args: {
          name: user.firstName,
        },
      }),
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: tg.locale.text('profile-button'),
              callback_data: tg.payload.encode(tg.actions.tree.profile),
            },
          ],
        ],
      },
    });
  }
}
