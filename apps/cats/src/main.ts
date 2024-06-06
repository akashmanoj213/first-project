import { NestFactory } from '@nestjs/core';
import { CatsModule } from './cats.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { stringify } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(CatsModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV === 'development')
    fs.writeFileSync('./apps/cats/auto-api-spec.yaml', stringify(document));

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
