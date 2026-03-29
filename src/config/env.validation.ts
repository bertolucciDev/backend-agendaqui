import { z } from 'zod';

const appSchema = {
  APP_NAME: z.string().default('api-name'),
  APP_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  APP_PORT: z.coerce.number().default(3000),
  APP_URL: z.string().default('http://localhost:3000'),
  FRONT_URL: z.string().default('http://localhost:5173'),
};

const authSchema = {
  JWT_SECRET: z.string().min(1),
  ACCESS_TOKEN_EXP: z.string().default('1h'),
  REFRESH_TOKEN_EXP: z.string().default('7d'),
};

const databaseSchema = {
  DATABASE_URL: z.string().min(1),
};

const redisSchema = {
  ENABLE_CACHE: z.coerce.boolean().optional(),
  CACHE_HOST: z.string().optional(),
  CACHE_PORT: z.coerce.number().optional(),
  CACHE_DB: z.coerce.number().default(0),
  CACHE_TTL: z.coerce.number().default(300),
  CACHE_URL: z.string().optional(),
};

const emailSchema = {
  ENABLE_EMAIL: z.coerce.boolean().optional(),
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.coerce.number().optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
  EMAIL_FAKE: z.coerce.boolean().optional(),
};

const baseSchema = z.object({
  ...appSchema,
  ...databaseSchema,
  ...authSchema,
  ...redisSchema,
  ...emailSchema,
});

const withConditionalFeatures = (
  schema: typeof baseSchema,
  isServerless: boolean,
) =>
  schema
    .transform((data) => {
      const cacheDefault = !isServerless && data.APP_ENV === 'prod';
      const emailDefault = true;
      const emailFakeDefault = isServerless || data.APP_ENV !== 'prod';

      return {
        ...data,
        ENABLE_CACHE: data.ENABLE_CACHE ?? cacheDefault,
        ENABLE_EMAIL: data.ENABLE_EMAIL ?? emailDefault,
        EMAIL_FAKE: data.EMAIL_FAKE ?? emailFakeDefault,
        EMAIL_PORT: data.EMAIL_PORT ?? 587,
      };
    })
    .superRefine((data, ctx) => {
      if (data.ENABLE_CACHE && !data.CACHE_URL) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'CACHE_URL é obrigatório quando ENABLE_CACHE=true (ou em prod não-serverless).',
          path: ['CACHE_URL'],
        });
      }

      if (data.ENABLE_EMAIL && !data.EMAIL_FAKE) {
        if (!data.EMAIL_HOST) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'EMAIL_HOST é obrigatório quando ENABLE_EMAIL=true e EMAIL_FAKE=false.',
            path: ['EMAIL_HOST'],
          });
        }

        if (!data.EMAIL_USER) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'EMAIL_USER é obrigatório quando ENABLE_EMAIL=true e EMAIL_FAKE=false.',
            path: ['EMAIL_USER'],
          });
        }

        if (!data.EMAIL_PASSWORD) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              'EMAIL_PASSWORD é obrigatório quando ENABLE_EMAIL=true e EMAIL_FAKE=false.',
            path: ['EMAIL_PASSWORD'],
          });
        }
      }
    });

export const envSchema = withConditionalFeatures(baseSchema, false);
export const envServerlessSchema = withConditionalFeatures(baseSchema, true);
