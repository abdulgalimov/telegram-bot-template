import { BaseHandler } from '../base';
import { tg } from '../../tg';
import { Context, ContextAny } from '../../types';
import { UpdateResult } from '@abdulgalimov/tg-framework';

export class ProfileHandler extends BaseHandler {
  public async update() {
    const ctx = tg.context.get();
    switch (ctx.action) {
      case tg.actions.tree.profile:
        return await this.profile(ctx);
      case tg.actions.tree.profile.language:
        return await this.language(
          ctx as Context<{ action: typeof tg.actions.tree.profile.language }>,
        );
    }
  }

  private async profile(ctx: ContextAny) {
    await tg.request.reply({
      text: tg.locale.text('profile-menu'),
      reply_markup: {
        keyboard: [
          [
            {
              text: 'ru',
              payload: tg.payload.encode(tg.actions.tree.profile.language, {
                langCode: 'ru',
              }),
            },
            {
              text: 'en',
              payload: tg.payload.encode(tg.actions.tree.profile.language, {
                langCode: 'en',
              }),
            },
          ],
        ],
      },
    });
  }

  private async language(
    ctx: Context<{ action: typeof tg.actions.tree.profile.language }>,
  ): Promise<UpdateResult> {
    const { user, payload } = ctx;
    const { langCode } = payload;

    await this.db.users.updateLanguage(user.id, langCode);
    user.langCode = langCode;

    await tg.request.reply({
      text: `selected lang: ${langCode}`,
      reply_markup: {
        remove_keyboard: true,
      },
    });

    return {
      redirect: {
        action: tg.actions.tree.main,
      },
    };
  }
}
