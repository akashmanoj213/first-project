import { Controller, Get, Header, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './Interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(createCat: CreateCatDto): string {
    const cat: Cat = { ...createCat };
    this.catsService.create(cat);

    return 'This creates a new cat';
  }

  @Get()
  @Header('cache-control', 'none')
  async findAll() {
    return this.catsService.findAll();
  }

  @Get('get-that-cat/:name')
  findOneCat(@Param('name') name: string): Cat {
    return this.catsService.findOne(name);
  }
}
