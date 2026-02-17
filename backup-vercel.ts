import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import { AppModule } from '../src/modules/app/app.module';

let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const server = express();

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.enableCors({
      origin: ['http://localhost:5173', 'https://agendaqui-web.vercel.app'],
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
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

    SwaggerModule.setup('docs', app, document, {
      customCssUrl: 'https://unpkg.com/swagger-ui-dist/swagger-ui.css',
      customJs: [
        'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
        'https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js',
      ],
    });

    await app.init();

    cachedApp = server;
  }

  return cachedApp;
}

export default async function handler(req, res) {
  const server = await bootstrap();
  return server(req, res);
}