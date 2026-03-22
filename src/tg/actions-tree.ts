import { payloadSchema } from '@abdulgalimov/telegram';

const core = {
  none: {},
  hide: {},
  command: {
    '@payloads': payloadSchema.object({
      command: payloadSchema.string(),
      value: payloadSchema.string().optional(),
    }),
  },
  text: {},
  inline: {
    '@payloads': payloadSchema.object({
      query: payloadSchema.string(),
    }),
    select: {
      '@payloads': payloadSchema.object({
        query: payloadSchema.number(),
      }),
    },
  },
  viaBot: {},
} as const;

export const actionsTree = {
  core,

  menu: {
    start: {},
    help: {},
  },

  main: {},

  profile: {
    language: {
      '@payloads': payloadSchema.object({
        langCode: payloadSchema.string(),
      }),
    },
  },
} as const;
