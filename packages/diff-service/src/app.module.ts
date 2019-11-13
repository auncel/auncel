import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifferenceModule } from './difference/difference.module';
import { TimeMiddleware } from './time.middleware';
import { HtmlService } from './html/html.service';

@Module({
  imports: [DifferenceModule],
  controllers: [AppController],
  providers: [AppService, HtmlService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimeMiddleware).forRoutes('difference')
  }
}
