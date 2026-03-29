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
  CACHE_HOST: z.string().optional(),
  CACHE_PORT: z.coerce.number().optional(),
  CACHE_DB: z.coerce.number().default(0),
  CACHE_TTL: z.coerce.number().default(300),
  CACHE_URL: z.string().optional(),
};

const emailSchema = {
  EMAIL_HOST: z.string().default('smtp.example.com'),
  EMAIL_PORT: z.coerce.number().default(587),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
  EMAIL_FAKE: z.coerce.boolean().default(true),
};

export const envSchema = z.object({
  ...appSchema,
  ...databaseSchema,
  ...authSchema,
  ...redisSchema,
  ...emailSchema,
});

export const envServerlessSchema = z.object({
  ...appSchema,
  ...databaseSchema,
  ...authSchema,
  ...redisSchema,
  ...emailSchema,
});
