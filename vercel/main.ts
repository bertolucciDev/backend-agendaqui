import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import { AppModule } from '../src/modules/app/app.module';
import { apiReference } from '@scalar/nestjs-api-reference';
import { env } from '../src/config/env';

let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const server = express();

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.enableCors({
      origin: ['http://localhost:5173', 'https://agendaqui-web.vercel.app'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });

    const config = new DocumentBuilder()
      .setTitle(process.env.APP_NAME!)
      .setDescription('API Documentation')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .build();

    const document = () => SwaggerModule.createDocument(app, config);

    app.use(
      '/docs',
      apiReference({
        content: document,
        layout: 'modern',
        theme: 'elysiajs',
        hideModels: true,
        hideClientButton: true,
        persistAuth: true,
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
