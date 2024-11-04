import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger, ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { HttpExceptionFilter } from '@modules/shared/helpers/http-exception.filter';
import { envs } from './core/adapters/envs.adapter';
import { InitDB } from '@core/database';

async function bootstrap() {
  await InitDB.start();

  const app = await NestFactory.create(AppModule);
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
    .addTag('Cats and Breeds with Auth')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
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

  await app.listen(envs.PORT ?? 3000);
}
bootstrap();
