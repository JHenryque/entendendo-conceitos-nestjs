/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UsersService', () => {
  let userService: UsersService;
  let prismaService: PrismaService;
  let hashingService: HashingServiceProtocol;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: HashingServiceProtocol,
          useValue: {},
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
    hashingService = module.get<HashingServiceProtocol>(HashingServiceProtocol);

    // prismaService = new PrismaService();
    // hashingService = { hash: jest.fn() };
    // service = new UsersService(prismaService, hashingService);
  });

  it('deveria testar o modulo user service', () => {
    console.log(userService);
    expect(userService).toBeDefined();
  });
  //   test.todo('deveria escrever mais testes para o user service');
  //   test('deveria escrever um teste simples', () => {
  //     expect(1 + 1).toBe(2);
  //   });
});
