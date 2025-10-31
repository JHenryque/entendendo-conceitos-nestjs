import { Injectable } from '@nestjs/common';

@Injectable()
export class TesksService {
  getAllTesks(): string {
    return 'Tesk 1';
  }

  getAllTesks2(): string {
    return 'Tesk 2';
  }
}
