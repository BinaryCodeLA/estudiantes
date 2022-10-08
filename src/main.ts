import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //routing global configuration
  app.setGlobalPrefix('api')

  //swagger configuration
 const options = new DocumentBuilder()
 .setTitle('API Documentation')
 .setDescription('API Students CRUD Documentation')
 .setVersion('1.0.0')
 .build();
 const document = SwaggerModule.createDocument(app,options);
 SwaggerModule.setup('api', app, document);

 //Cors configuration
 app.enableCors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
});

//Global conf validators
 app.useGlobalPipes(new ValidationPipe())

 
  await app.listen(3000);
}
bootstrap();
