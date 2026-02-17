"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    APP_NAME: zod_1.z.string().default('api-name'),
    APP_ENV: zod_1.z.enum(['dev', 'prod', 'test']).default('dev'),
    APP_PORT: zod_1.z.coerce.number().default(3000),
    APP_URL: zod_1.z.string().default('http://localhost:3000'),
    DATABASE_URL: zod_1.z.string(),
    CACHE_HOST: zod_1.z.string(),
    CACHE_PORT: zod_1.z.coerce.number(),
    CACHE_DB: zod_1.z.coerce.number().default(0),
    CACHE_TTL: zod_1.z.coerce.number(),
    CACHE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string().default('a-string-secret-at-least-256-bits-long'),
    ACCESS_TOKEN_EXP: zod_1.z.string().default('1h'),
    REFRESH_TOKEN_EXP: zod_1.z.string().default('7d'),
    EMAIL_HOST: zod_1.z.string().default('smtp.example.com'),
    EMAIL_PORT: zod_1.z.coerce.number().default(587),
    EMAIL_USER: zod_1.z.string(),
    EMAIL_PASSWORD: zod_1.z.string(),
    EMAIL_FAKE: zod_1.z.coerce.boolean().default(true),
});
//# sourceMappingURL=env.validation.js.map