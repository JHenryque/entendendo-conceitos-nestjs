import { Test, TestingModule } from '@nestjs/testing';
import { TesksService } from './tesks.service';

describe('TesksService', () => {
  let service: TesksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TesksService],
    }).compile();

    service = module.get<TesksService>(TesksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
