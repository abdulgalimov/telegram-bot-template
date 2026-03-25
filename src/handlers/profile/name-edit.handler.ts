import { tg } from '../../tg';
import { Context } from '../../types';
import { db } from '../../db';

type NameFormData = {
  name: string;
};

type ContextForm = Context<{ form: NameFormData }>;

async function showMenu(ctx: ContextForm) {
  const form = ctx.form;
  if (form.data?.name) {
    await tg.form.reply({
      text: tg.locale.text('save-new-name', {
        args: {
          name: form.data.name,
        },
      }),
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Ok',
              callback_data: tg.payload.encode(tg.actions.tree.profile.name.save),
            },
          ],
        ],
      },
    });
  } else {
    await tg.form.reply({
      text: tg.locale.text('send-new-name'),
    });
  }
}

tg.handlers.action(tg.actions.tree.profile.name, async (ctx) => {
  ctx.form = await tg.form.create<NameFormData>({
    action: tg.actions.tree.profile.name,
    defaultData: {
      name: '',
    },
  });

  await showMenu(ctx as ContextForm);
});

tg.handlers.action<{
  action: typeof tg.actions.tree.profile.name.progress;
  form: NameFormData;
}>(tg.actions.tree.profile.name.progress, async (ctx) => {
  const { update } = ctx;
  const formData: NameFormData = ctx.form.data || {
    name: '',
  };

  const text = update.message?.text;
  if (text) {
    formData.name = text;
  }

  await showMenu(ctx);
});

tg.handlers.action<{
  action: typeof tg.actions.tree.profile.name.cancel;
  form: NameFormData;
}>(tg.actions.tree.profile.name.cancel, async (ctx) => {
  await tg.form.delete();

  return {
    redirect: {
      action: tg.actions.tree.profile,
    },
  };
});

tg.handlers.action<{
  action: typeof tg.actions.tree.profile.name.save;
  form: NameFormData;
}>(tg.actions.tree.profile.name.save, async (ctx) => {
  const { user, form } = ctx;
  const name = form.data?.name!;
  await db.users.updateName(user.id, name);

  await tg.form.delete();

  return {
    redirect: {
      action: tg.actions.tree.profile,
    },
  };
});
