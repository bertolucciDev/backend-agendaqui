import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import serverless from 'serverless-http';
import { AppModule } from '../src/modules/app/app.module';
import { env } from '../src/config/env';
import { ValidationPipe } from '@nestjs/common';

let cachedApp: any;

async function bootstrap() {
  if (cachedApp) {
    return cachedApp;
  }

  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:5173', 'https://agendaqui-web.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  const config = new DocumentBuilder()
    .setTitle(env.APP_NAME)
    .setDescription(`Documentação oficial da API ${env.APP_NAME}.`)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (env.APP_ENV !== 'prod') {
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  await app.init();

  cachedApp = serverless(server);
  return cachedApp;
}

export default async function handler(req: any, res: any) {
  const server = await bootstrap();
  return server(req, res);
}
