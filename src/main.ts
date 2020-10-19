import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import * as firebase from 'firebase';
import 'firebase/storage';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // serve static file from img folder
  app.useStaticAssets(join(__dirname, '..', 'img'));
  app.setGlobalPrefix('/api');
  app.use(json({ limit: '50mb' }));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
