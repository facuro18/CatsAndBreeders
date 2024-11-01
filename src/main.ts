import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { HttpExceptionFilter } from '@modules/shared/helpers/http-exception.filter';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    //Control data received by controllers
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('Cats and Breeders')
    .setDescription('API Rest Project')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  const theme = new SwaggerTheme();
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Cats and Breeders',
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    explorer: true,
  });

  const loggerInstance = app.get(Logger);

  app.useGlobalFilters(new HttpExceptionFilter(loggerInstance));

  await app.listen(configService.get('port') ?? 3000);
}
bootstrap();
