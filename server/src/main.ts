import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Employee Performance Review')
    .setDescription(
      'Backend end services that allows employee to submit feedback towards each other  ',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  Logger.log(`Server started on http://localhost:${port}, Bootstrap`);
}
bootstrap();
