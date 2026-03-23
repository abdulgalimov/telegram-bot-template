import { BaseHandler, HandlerOptions } from '../base';
import { tg } from '../../tg';
import { Context, ContextAny } from '../../types';
import { NameEditHandler } from './name-edit.handler';

export class ProfileHandler extends BaseHandler {
  private readonly nameEditHandler: NameEditHandler;

  public constructor(handlerOptions: HandlerOptions) {
    super(handlerOptions);

    this.nameEditHandler = new NameEditHandler(handlerOptions);
  }

  public async update() {
    const ctx = tg.context.get();

    if (ctx.action.meta.childOf(tg.actions.tree.profile.name)) {
      return await this.nameEditHandler.update();
    }

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
        inline_keyboard: [
          [
            {
              text: 'ru',
              callback_data: tg.payload.encode(tg.actions.tree.profile.language, {
                langCode: 'ru',
              }),
            },
            {
              text: 'en',
              callback_data: tg.payload.encode(tg.actions.tree.profile.language, {
                langCode: 'en',
              }),
            },
          ],
          [
            {
              text: tg.locale.text('change-name-button'),
              callback_data: tg.payload.encode(tg.actions.tree.profile.name),
            },
          ],
          [
            tg.inlineKeyboard.backButton({
              actionItem: tg.actions.tree.main,
            }),
          ],
        ],
      },
    });
  }

  private async language(ctx: Context<{ action: typeof tg.actions.tree.profile.language }>) {
    const { user, payload } = ctx;
    const { langCode } = payload;

    await this.db.users.updateLanguage(user.id, langCode);
    user.langCode = langCode;

    await tg.request.showAlert(`Selected language: ${langCode}`);
  }
}
