import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import { AppModule } from '../src/modules/app/app.module';
import { env } from '../src/config/env';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  ConsoleLogger,
} from '@nestjs/common';

let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const server = express();

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
      bufferLogs: true,
      logger: new ConsoleLogger({
        prefix: env.APP_NAME,
      }),
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    app.enableCors({
      origin: [env.FRONT_URL, 'http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });

    const config = new DocumentBuilder()
      .setTitle(env.APP_NAME)
      .setDescription(`Documentação oficial da API ${env.APP_NAME}.`)
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('health')
      .addTag('auth')
      .addTag('user')
      .build();

    if (env.APP_ENV !== 'prod') {
      const document = () => SwaggerModule.createDocument(app, config);

      SwaggerModule.setup('docs', app, document, {
        customCssUrl: 'https://unpkg.com/swagger-ui-dist/swagger-ui.css',
        customJs: [
          'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
          'https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js',
        ],
      });
    }

    await app.init();

    cachedApp = server;
  }

  return cachedApp;
}

export default async function handler(req, res) {
  const server = await bootstrap();
  return server(req, res);
}
