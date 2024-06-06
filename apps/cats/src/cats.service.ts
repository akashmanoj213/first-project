import { Injectable } from '@nestjs/common';
import { Cat } from './Interfaces/cat.interface';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { UserListResponseDto } from './dto/user-list-response.dto';
import { Observable, lastValueFrom } from 'rxjs';

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
    return this.cats.find((cat) => cat.name === name);
  }

  findCatOwners(): Promise<AxiosResponse<UserListResponseDto>> {
    return lastValueFrom(this.httpService.get('https://reqres.in/api/users'));
  }
}
