import { Injectable } from '@nestjs/common';
import { Cat } from './Interfaces/cat.interface';
import { HttpService } from '@nestjs/axios';
import { UserListResponseDto } from './dto/user-list-response.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}

  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll() {
    return this.cats;
  }

  findOne(name: string) {
    const cat = this.cats.find((cat) => cat.name === name);
    if (!cat) throw new Error(`cat with name: ${name} not found!`);
    return cat;
  }

  async findCatOwners() {
    const response = await lastValueFrom(
      this.httpService.get('https://reqres.in/api/users'),
    );

    const userListRespone: UserListResponseDto = response.data;
    return userListRespone.data;
  }

  async test() {
    return 'Cats service is working!';
  }
}
