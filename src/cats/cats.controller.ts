import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This creates a new cat';
  }

  @Get()
  @Header('cache-control', 'none')
  async findAll() {
    return 'this is all cats';
  }

  @Get('get-that-cat/:id')
  findOneCat(@Param('id') id: string): string {
    return `The returned cat has an id of : ${id.toString()}`;
  }

  @Post()
  createCat(@Body() createCatDto: CreateCatDto) {
    return 'This created new cat';
  }
}
