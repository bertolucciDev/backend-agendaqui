import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  ValidationPipe,
} from '@nestjs/common';
import { env } from '@/config/env';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ResponseInterceptor } from '@/shared/interceptors/response.interceptor';
import fastifyMultipart from '@fastify/multipart';
// import { ParseIntIdsPipe } from '@/shared/pipes/parse-int-ids.pipe';
// import fastifyHelmet from '@fastify/helmet';
import { apiReference } from '@scalar/nestjs-api-reference';
import fastifyCors from '@fastify/cors';
// import { RedisIoAdapter } from '@/shared/infra/cache/redis/redis-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: new ConsoleLogger({
        prefix: env.APP_NAME,
      }),
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
    // new ParseIntIdsPipe(),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle(env.APP_NAME)
    .setDescription(`Documentação oficial da API ${env.APP_NAME}.`)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('user')
    .build();

  if (env.APP_ENV !== 'prod') {
    const document = () => SwaggerModule.createDocument(app, config);
    app.use(
      '/docs',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      apiReference({
        content: document,
        withFastify: true,
        layout: 'modern',
        theme: 'elysiajs',
        hideModels: true,
        hideClientButton: true,
        persistAuth: true,
        metaData: {
          title: `${env.APP_NAME} - Documentação da API`,
        },
        authentication: {
          preferredSecurityScheme: 'bearer',
        },
      }),
    );
  }

  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await app.register(fastifyMultipart);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // if (env.APP_ENV === 'stage' || env.APP_ENV === 'prod') {
  // await app.register(fastifyHelmet);
  // }

  await app.listen(env.APP_PORT);

  if (env.APP_ENV === 'dev') {
    console.log('------------------------------------');
    console.log(`API rodando na porta ${env.APP_PORT}.`);
    console.log(`API: ${env.APP_URL}`);
    console.log(`Docs: ${env.APP_URL}/docs`);
    console.log('------------------------------------');
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
