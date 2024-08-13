import { Test, TestingModule } from '@nestjs/testing';
import { PubSubClientService } from './pub-sub-client.service';

describe('pubSubClientService', () => {
  let service: PubSubClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubSubClientService],
    }).compile();

    service = module.get<PubSubClientService>(PubSubClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
