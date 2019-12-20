import { Test, TestingModule } from '@nestjs/testing';
import { DifferenceController } from './difference.controller';

describe('Difference Controller', () => {
  let controller: DifferenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DifferenceController],
    }).compile();

    controller = module.get<DifferenceController>(DifferenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
