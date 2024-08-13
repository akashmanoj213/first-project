import {
  Body,
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { CatDto } from './dto/cat.dto';
import { Cat } from './Interfaces/cat.interface';
import { UserDto } from './dto/user.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Post('create-cat-handler')
  createCatHandler(@Body() createCat: CreateCatDto) {
    const cat: Cat = { ...createCat };
    this.catsService.create(cat);

    const catResponse: CatDto = { ...cat };
    return catResponse;
  }

  @Post()
  create(@Body() createCat: CreateCatDto) {
    const cat: Cat = { ...createCat };
    this.catsService.create(cat);

    const catResponse: CatDto = { ...cat };
    return catResponse;
  }

  @Get()
  @Header('cache-control', 'none')
  findAll(): CatDto[] {
    const cats = this.catsService.findAll();

    const catsDto: CatDto[] = cats.map((cat) => ({ ...cat }));

    return catsDto;
  }

  @Get('owners')
  async findCatOwners(): Promise<UserDto[]> {
    return await this.catsService.findCatOwners();
  }

  @Get(':name')
  findOneCat(@Param('name') catName: string): CatDto {
    try {
      const cat = this.catsService.findOne(catName);
      const { name, age, breed } = cat || {};
      const catDto: CatDto = { name, age, breed };

      return catDto;
    } catch (error) {
      throw new NotFoundException('Cat not found');
    }
  }
}
