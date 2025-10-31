import { Test, TestingModule } from '@nestjs/testing';
import { RestestService } from './restest.service';

describe('RestestService', () => {
  let service: RestestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestestService],
    }).compile();

    service = module.get<RestestService>(RestestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
