import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './Interfaces/cat.interface';
import { CatDto } from './dto/cat.dto';
import { UserListResponseDto } from './dto/user-list-response.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  // @ApiBody({ type: CreateCatDto })
  create(@Body() createCat: CreateCatDto) {
    const cat: Cat = { ...createCat };
    this.catsService.create(cat);

    return 101;
  }

  @Get()
  @Header('cache-control', 'none')
  async findAll(): Promise<Cat[]> {
    const cats = this.catsService.findAll();

    const catsDto: CatDto[] = cats.map((cat) => ({ ...cat }));

    return catsDto;
  }

  @Get('get-that-cat/:name')
  // @ApiParam({ name: 'name' })
  findOneCat(@Param('name') name: string) {
    const cat = this.catsService.findOne(name);

    const catDto: CatDto = { ...cat };

    return catDto;
  }

  @Get('owners')
  async findCatOwners(): Promise<UserListResponseDto> {
    return (await this.catsService.findCatOwners()).data;
  }
}
