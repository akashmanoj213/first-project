import { Injectable } from '@nestjs/common';
import { PubSubClientService } from '@app/common-services/pub-sub-client';
import { PubSubMessageDto } from 'libs/shared/dtos';
import { OwnerDto } from './dtos/owner.dto';
import { CreateTopicSubscription } from 'libs/shared/interfaces/createTopicSubscription.dto';
import { Owner } from './entities/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    private readonly pubSubClient: PubSubClientService,
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  // create pub-sub topics required for running locally
  createTopics(topics: string[]) {
    topics.forEach(async (topic) => {
      await this.pubSubClient.createTopic(topic);
    });
  }

  //create subscription to pub-sub topics
  createSubscriptions(createTopicSubscription: CreateTopicSubscription[]) {
    try {
      createTopicSubscription.forEach(async (subscription) => {
        await this.pubSubClient.createSubscription(
          subscription.pushEndpoint,
          subscription.topicNameOrId,
          subscription.subscriptionNameOrId,
        );
      });
    } catch (error) {
      console.log('Error creating subscriptions for topic :', error.message);
      throw error;
    }
  }

  pushToTopic(data: object) {
    const topicName = 'create-owner';
    return this.pubSubClient.publishMessage(topicName, data);
  }

  formatToOwnerDto(data: PubSubMessageDto) {
    try {
      const ownerDto = this.pubSubClient.formatMessageData<OwnerDto>(
        data,
        OwnerDto,
      );

      return ownerDto;
    } catch (error) {
      console.log(
        `Error occured while formatting pubsub message : ${error.message}`,
      );
      throw error;
    }
  }

  async saveOwner(ownerDto: OwnerDto) {
    const owner = new Owner({
      ...ownerDto,
    });

    return await this.ownerRepository.save(owner);
  }

  async getOwners() {
    return await this.ownerRepository.find();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
