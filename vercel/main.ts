import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/modules/app/app.module';
import express from 'express';
import serverless from 'serverless-http';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  await app.init();
}

void bootstrap();

export default serverless(server);
