import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OwnerDto } from './dtos/owner.dto';
import { PubSubMessageDto } from 'libs/shared/dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('Hello from first-project!');
    return this.appService.getHello();
  }

  @Post('owner')
  createOwner(@Body() ownerDto: OwnerDto) {
    console.log('owner-dto', ownerDto);
    return this.appService.pushToTopic(ownerDto);
  }

  @Post('owner-handler')
  createOwnerHandler(@Body() pubSubMessage: PubSubMessageDto) {
    console.log('Owner Handler triggered!');
    const ownerDto = this.appService.formatToOwnerDto(pubSubMessage);

    const owner = this.appService.saveOwner(ownerDto);
    return owner;
  }

  @Get('owner')
  getOwners() {
    return this.appService.getOwners();
  }
}
