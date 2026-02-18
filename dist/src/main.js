"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const common_1 = require("@nestjs/common");
const env_1 = require("../src/config/env");
const app_module_1 = require("./modules/app/app.module");
const swagger_1 = require("@nestjs/swagger");
const multipart_1 = require("@fastify/multipart");
const nestjs_api_reference_1 = require("@scalar/nestjs-api-reference");
const cors_1 = require("@fastify/cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(), {
        logger: new common_1.ConsoleLogger({
            prefix: env_1.env.APP_NAME,
        }),
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    const config = new swagger_1.DocumentBuilder()
        .setTitle(env_1.env.APP_NAME)
        .setDescription(`Documentação oficial da API ${env_1.env.APP_NAME}.`)
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('health')
        .addTag('auth')
        .addTag('user')
        .build();
    if (env_1.env.APP_ENV !== 'prod') {
        const document = () => swagger_1.SwaggerModule.createDocument(app, config);
        app.use('/docs', (0, nestjs_api_reference_1.apiReference)({
            content: document,
            withFastify: true,
            layout: 'modern',
            theme: 'elysiajs',
            hideModels: true,
            hideClientButton: true,
            persistAuth: true,
            metaData: {
                title: `${env_1.env.APP_NAME} - Documentação da API`,
            },
            authentication: {
                preferredSecurityScheme: 'bearer',
            },
        }));
    }
    await app.register(multipart_1.default);
    await app.register(cors_1.default, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    await app.listen(env_1.env.APP_PORT);
    if (env_1.env.APP_ENV === 'dev') {
        console.log('------------------------------------');
        console.log(`API rodando na porta ${env_1.env.APP_PORT}.`);
        console.log(`API: ${env_1.env.APP_URL}`);
        console.log(`Docs: ${env_1.env.APP_URL}/docs`);
        console.log('------------------------------------');
    }
}
bootstrap();
//# sourceMappingURL=main.js.map