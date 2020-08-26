import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiModule } from './api.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config: ConfigService = app.get(ConfigService);
  const port = config.get('port');
  await app.listen(port, () => logger.log(`Server listeing on ${port}`));
}
bootstrap();
