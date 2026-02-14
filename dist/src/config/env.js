"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const env_validation_1 = require("./env.validation");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const parsedEnv = env_validation_1.envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error('❌ Invalid environment variables', parsedEnv.error.format());
    throw new Error('Invalid environment variables.');
}
exports.env = parsedEnv.data;
//# sourceMappingURL=env.js.map