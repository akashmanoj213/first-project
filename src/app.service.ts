import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const name = 'Akash Manoj';
    console.log(name);
    return 'Hello World!';
  }
}
