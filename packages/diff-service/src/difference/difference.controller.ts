import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DifferenceService } from './difference.service';
import { HtmlService } from 'src/html/html.service';

@Controller('difference')
export class DifferenceController {
  public constructor(private readonly diffService: DifferenceService, private readonly htmlService: HtmlService) {}

  @MessagePattern({ cmd: 'create-render-tree' })
  public async createRenderTree(fragment: string, stylesheet: string) {
    const renderTree = await this.diffService.getRenderTree('');
    return renderTree;
  }

  @MessagePattern({ cmd: 'diff' })
  public async diff() {

  }

  @MessagePattern({ cmd: 'diff-html' })
  public async diffHTML(parma) {
    const { exemplar, instance } = parma;
    // TODO: 验证 html
    Logger.log(`received exemplar: ${exemplar}, instance: ${instance}`);
    return await this.diffService.diffHTML(exemplar, instance);
  }

  @MessagePattern({ cmd: 'init-answer-tree' })
  public async init() {

  }
}
