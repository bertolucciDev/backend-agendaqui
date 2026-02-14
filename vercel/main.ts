import { NestFactory } from '@nestjs/core'
import { AppModule } from '../src/modules/app/app.module'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'

let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const server = express()

    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    )

    await app.init()

    cachedApp = server
  }

  return cachedApp
}

export default async function handler(req, res) {
  const server = await bootstrap()
  return server(req, res)
}
