import { Module } from '@nestjs/common';
import { DifferenceController } from './difference.controller';
import { DifferenceService } from './difference.service';
import { HtmlService } from 'src/html/html.service';

@Module({
  controllers: [DifferenceController],
  providers: [DifferenceService, HtmlService],
})
export class DifferenceModule {}
