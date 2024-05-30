import { Injectable } from '@nestjs/common';
import { Cat } from './Interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll() {
    return this.cats;
  }

  findOne(name: string) {
    return this.cats.find((cat) => cat.name === name);
  }
}
