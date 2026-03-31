import { z } from 'zod';

export const envSchema = z.object({
  // APP
  APP_NAME: z.string().default('api-name'),
  APP_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  APP_PORT: z.coerce.number().default(3000),
  APP_URL: z.string().default('http://localhost:3000'),

  // Front
  FRONT_URL: z.string().default('http://localhost:5173'),

  // Database
  DATABASE_URL: z.string(),

  // Cache
  CACHE_HOST: z.string(),
  CACHE_PORT: z.coerce.number(),
  CACHE_DB: z.coerce.number().default(0),
  CACHE_TTL: z.coerce.number(),
  CACHE_URL: z.string(),

  // JWT
  JWT_SECRET: z.string(),
  ACCESS_TOKEN_EXP: z.string().default('1h'),
  REFRESH_TOKEN_EXP: z.string().default('7d'),

  // Email
  EMAIL_HOST: z.string().default('smtp.example.com'),
  EMAIL_PORT: z.coerce.number().default(587),
  EMAIL_USER: z.string(),
  EMAIL_PASSWORD: z.string(),
  EMAIL_FAKE: z.coerce.boolean().default(true),
});
