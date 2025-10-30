import { Test, TestingModule } from '@nestjs/testing';
import { TesksController } from './tesks.controller';

describe('TesksController', () => {
  let controller: TesksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TesksController],
    }).compile();

    controller = module.get<TesksController>(TesksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
