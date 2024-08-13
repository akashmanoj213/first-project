import { Module } from '@nestjs/common';
import { PubSubClientService } from './pub-sub-client.service';

@Module({
  providers: [PubSubClientService],
  exports: [PubSubClientService],
})
export class PubSubClientModule {}
