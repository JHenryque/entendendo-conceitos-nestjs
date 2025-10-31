import { Test, TestingModule } from '@nestjs/testing';
import { RestestController } from './restest.controller';
import { RestestService } from './restest.service';

describe('RestestController', () => {
  let controller: RestestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestestController],
      providers: [RestestService],
    }).compile();

    controller = module.get<RestestController>(RestestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
