import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import { AppModule } from '../src/modules/app/app.module';
import { env } from '../src/config/env';
import { apiReference } from '@scalar/nestjs-api-reference';

let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const server = express();

    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      {
        bufferLogs: true,
      },
    );

    app.enableCors({
      origin: ['http://localhost:5173', 'https://agendaqui-web.vercel.app'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });

    const config = new DocumentBuilder()
      .setTitle(env.APP_NAME)
      .setDescription('API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    app.use(
      '/docs',
      apiReference({
        content: document,
      }),
    );

    await app.init();

    cachedApp = server;
  }

  return cachedApp;
}

export default async function handler(req, res) {
  const server = await bootstrap();
  return server(req, res);
}
