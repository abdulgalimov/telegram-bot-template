import { tg } from '../../tg';
import { db } from '../../db';

import './name-edit.handler';

tg.handlers.action(tg.actions.tree.profile, async (ctx) => {
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
});

tg.handlers.action(tg.actions.tree.profile.language, async (ctx) => {
  const { user, payload } = ctx;
  const { langCode } = payload;

  await db.users.updateLanguage(user.id, langCode);
  user.langCode = langCode;

  return {
    redirect: {
      action: tg.actions.tree.profile,
    },
  };
});
