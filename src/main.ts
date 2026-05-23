import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Response } from 'express';
import * as YAML from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Project API')
    .setDescription('Backend API (Prisma + NestJS)')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use('/api-docs-yaml', (req, res: Response) => {
    res.header('Content-Type', 'application/x-yaml');
    res.send(YAML.stringify(document));
  });
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
