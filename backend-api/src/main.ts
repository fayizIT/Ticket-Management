import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Allow requests from your Vite frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
}

bootstrap();
