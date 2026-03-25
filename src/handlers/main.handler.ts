import { tg } from '../tg';

tg.handlers.action(tg.actions.tree.main, async (ctx) => {
  const { user } = ctx;
  await tg.request.reply({
    text: tg.locale.text('main-menu', {
      args: {
        name: user.fullName,
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
});
