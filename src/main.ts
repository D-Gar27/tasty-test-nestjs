import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://dashboad-tasty.vercel.app',
    ],
    credentials: true, // This allows cookies to be sent from the frontend
  });
  await app.listen(3000);
}
bootstrap();
