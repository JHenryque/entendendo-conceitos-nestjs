/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create.user.dto';

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
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue({
                id: 1,
                name: 'jose',
                email: 'jose@gmail.com',
              }),
            },
          },
        },
        {
          provide: HashingServiceProtocol,
          useValue: {
            hash: jest.fn(),
          },
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

  it('deveria criar o user service', async () => {
    const createUserDto: CreateUserDto = {
      email: 'jose@gmail.com',
      name: 'jose',
      password: '123456',
    };

    jest.spyOn(hashingService, 'hash').mockResolvedValue('HASH_MOCK_EXEMPLO');

    const result = await userService.create(createUserDto);

    //expect(hashingService.hash).toHaveBeenCalled();

    expect(hashingService).toHaveBeenCalled();
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: 'HASH_MOCK_EXEMPLO',
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    expect(result).toEqual({
      id: 1,
      name: 'jose',
      email: 'jose@gmail.com',
    });
  });
});
