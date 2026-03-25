import { ContextAny } from '../types';
import { tg } from '../tg';

tg.handlers.action(tg.actions.tree.core.command, async (ctx) => {
  const { payload } = ctx;
  switch (payload.command) {
    case '/start':
      return await start(ctx);
  }
});

async function start(ctx: ContextAny) {
  return {
    redirect: {
      action: tg.actions.tree.main,
    },
  };
}
