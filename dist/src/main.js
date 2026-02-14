"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./modules/app/app.module");
const env_1 = require("./config/env");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle(env_1.env.APP_NAME)
        .setDescription('API Documentation')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'access-token')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, documentFactory);
    await app.listen(env_1.env.APP_PORT);
    if (env_1.env.APP_ENV === 'dev') {
        console.log('------------------------------------');
        console.log(`API running on port ${env_1.env.APP_PORT}.`);
        console.log(`API: ${env_1.env.APP_URL}`);
        console.log(`Docs: ${env_1.env.APP_URL}/docs`);
        console.log('------------------------------------');
    }
}
void bootstrap();
//# sourceMappingURL=main.js.map