"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    APP_NAME: zod_1.z.string().default('Nome'),
    APP_ENV: zod_1.z.enum(['dev', 'prod', 'test']).default('dev'),
    APP_PORT: zod_1.z.coerce.number().default(3000),
    APP_URL: zod_1.z.string().default('http://localhost:3000'),
    DATABASE_URL: zod_1.z.string(),
});
//# sourceMappingURL=env.validation.js.map