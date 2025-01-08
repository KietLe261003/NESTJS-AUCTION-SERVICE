import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './configuration/app/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exceptions/http.exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://apidog.com',
      'http://192.168.1.190:3001',
      'http://localhost:5173',
    ],
  });
  // app.useGlobalFilters(new HttpExceptionFilter())

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('ASSET SERVICE')
    .setDescription('The ASSET API description')
    .setVersion('1.0')
    .addTag('Asset')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // get app config for cors serttings and starting the app.
  const appConfig: AppConfigService = app.get(AppConfigService);
  await app.listen(appConfig.servicePort, () =>
    console.log(`Auction management service is running on: `, {
      host: appConfig.serviceHost,
      port: appConfig.servicePort,
    }),
  );
}

bootstrap();
