import { BaseHandler } from '../base';
import { tg } from '../../tg';
import { Context, ContextAny } from '../../types';
import { UpdateResult } from '@abdulgalimov/telegram';

type NameFormData = {
  name: string;
};

type ContextForm = Context<{ form: NameFormData }>;

export class NameEditHandler extends BaseHandler {
  public async update() {
    const ctx = tg.context.get();

    switch (ctx.action) {
      case tg.actions.tree.profile.name:
        return await this.name(ctx);
      case tg.actions.tree.profile.name.progress:
        return await this.progress(ctx as ContextForm);
      case tg.actions.tree.profile.name.cancel:
        return await this.cancel(ctx as ContextForm);
      case tg.actions.tree.profile.name.save:
        return await this.save(ctx as ContextForm);
    }
  }

  private async name(ctx: ContextAny) {
    ctx.form = await tg.form.create<NameFormData>({
      action: tg.actions.tree.profile.name,
      defaultData: {
        name: '',
      },
    });

    await this.showMenu(ctx as ContextForm);
  }

  private async showMenu(ctx: ContextForm) {
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

  private async progress(ctx: ContextForm) {
    const { update } = ctx;
    const formData: NameFormData = ctx.form.data || {
      name: '',
    };

    const text = update.message?.text;
    if (text) {
      formData.name = text;
    }

    await this.showMenu(ctx);
  }

  private async cancel(ctx: ContextForm): Promise<UpdateResult> {
    await tg.form.delete();

    return {
      redirect: {
        action: tg.actions.tree.profile,
      },
    };
  }

  private async save(ctx: ContextForm) {
    const { user, form } = ctx;
    const name = form.data?.name!;
    await this.db.users.updateName(user.id, name);

    await tg.form.delete();

    return {
      redirect: {
        action: tg.actions.tree.profile,
      },
    };
  }
}
