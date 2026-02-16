import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    APP_NAME: z.ZodDefault<z.ZodString>;
    APP_ENV: z.ZodDefault<z.ZodEnum<{
        dev: "dev";
        prod: "prod";
        test: "test";
    }>>;
    APP_PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    APP_URL: z.ZodDefault<z.ZodString>;
    DATABASE_URL: z.ZodString;
    CACHE_HOST: z.ZodString;
    CACHE_PORT: z.ZodCoercedNumber<unknown>;
    CACHE_DB: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    CACHE_TTL: z.ZodCoercedNumber<unknown>;
    CACHE_URL: z.ZodString;
    JWT_SECRET: z.ZodDefault<z.ZodString>;
    ACCESS_TOKEN_EXP: z.ZodDefault<z.ZodString>;
    REFRESH_TOKEN_EXP: z.ZodDefault<z.ZodString>;
    EMAIL_HOST: z.ZodDefault<z.ZodString>;
    EMAIL_PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    EMAIL_USER: z.ZodString;
    EMAIL_PASSWORD: z.ZodString;
    EMAIL_FAKE: z.ZodDefault<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
