import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    // options: {
    //   host: 'localhost',
    //   port: PORTS.diff,
    // },
  });
  // app.useStaticAssets(join(__dirname, '..', 'public'));

  app.listen(() => {
    console.log('diff services listening');
  });
}
bootstrap();
