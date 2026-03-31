import { envSchema } from './env.validation';
import { config } from 'dotenv';

config();

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables', parsedEnv.error.format());

  // Diagnóstico para produção/Vercel
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    console.log('--- Environment Diagnostic ---');
    console.log('APP_NAME:', process.env.APP_NAME);
    console.log('APP_ENV:', process.env.APP_ENV);
    console.log('DATABASE_URL defined:', !!process.env.DATABASE_URL);
    console.log('CACHE_HOST:', process.env.CACHE_HOST);
    console.log('CACHE_PORT:', process.env.CACHE_PORT);
    console.log('CACHE_URL defined:', !!process.env.CACHE_URL);
    console.log('JWT_SECRET defined:', !!process.env.JWT_SECRET);
    console.log('------------------------------');
  }

  throw new Error('Invalid environment variables.');
}

export const env = parsedEnv.data;
