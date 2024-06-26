import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from '@utils';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: "*", credentials: true });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Numerology API')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(Env.LISTEN_PORT);
}
bootstrap();
