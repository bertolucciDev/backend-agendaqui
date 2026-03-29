import { config } from 'dotenv';
import { envSchema, envServerlessSchema } from './env.validation';

config();

const schema = process.env.VERCEL ? envServerlessSchema : envSchema;
const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables', parsedEnv.error.format());
  throw new Error('Invalid environment variables.');
}

export const env = parsedEnv.data;
