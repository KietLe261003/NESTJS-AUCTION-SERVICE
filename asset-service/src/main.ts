import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './config/app/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

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
  const appConfig: AppConfigService = app.get(AppConfigService)
  await app.listen(appConfig.servicePort, () => console.log(`Asset service is running on: `, {
    host: appConfig.serviceHost,
    port: appConfig.servicePort
  }));
}

bootstrap();
