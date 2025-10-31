import { Injectable } from '@nestjs/common';

@Injectable()
export class TesksService {
  getAllTesks(): string {
    return 'Tesk 1';
  }

  getAllTesks2(): string {
    return 'Tesk 2';
  }

  getService() {
    return [
      { id: 1, name: 'Tesk Service 1' },
      { id: 2, name: 'Tesk Service 2' },
    ];
  }
}
