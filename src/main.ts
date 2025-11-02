import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // se for true ele remove propriedades que não estão no DTO
      // forbidNonWhitelisted: true, // se for true ele retorna um erro quando propriedades não estão no DTO
      // transform: true, // transforma os dados de entrada para os tipos definidos nos DTOs
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
