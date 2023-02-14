import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  if (process.env?.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('NestJS Teslo API')
      .setDescription(
        'Api for Teslo Store with authentication and image processing',
      )
      .setVersion(process.env.API_VERSION)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(process.env.API_PORT);
}
bootstrap();
