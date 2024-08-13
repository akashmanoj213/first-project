import { Injectable } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { PubSubMessageDto } from 'libs/shared/dtos';

@Injectable()
export class PubSubClientService {
  PUBSUB_PROJECT_ID = process.env.PUBSUB_PROJECT_ID;

  pubSub = new PubSub({
    projectId: this.PUBSUB_PROJECT_ID,
  });

  // create pub-sub topics required for running locally
  async createTopic(topicName: string) {
    try {
      //create topics
      await this.pubSub.createTopic(topicName);

      console.log(`Topic: ${topicName} created.`);
    } catch (error) {
      console.log('Error occured while creating topic : ', error.message);
      throw error;
    }
  }

  //create pub-sub subscriptions
  async createSubscription(
    pushEndpoint: string,
    topicNameOrId: string,
    subscriptionNameOrId: string,
  ) {
    try {
      const options = {
        pushConfig: {
          // Set to an HTTPS endpoint of your choice. If necessary, register
          // (authorize) the domain on which the server is hosted.
          pushEndpoint,
        },
      };

      await this.pubSub
        .topic(topicNameOrId)
        .createSubscription(subscriptionNameOrId, options);
      console.log(`Subscription ${subscriptionNameOrId} created.`);
    } catch (error) {
      console.log(
        'Error occured while creating subscription : ',
        error.message,
      );
      throw error;
    }
  }

  async publishMessage(
    topicNameOrId: string,
    data: string | object,
    attributes = null,
  ) {
    const strData: string =
      data && typeof data === 'string' ? data : JSON.stringify(data);

    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(strData);

    const messsage = {
      data: dataBuffer,
      ...(attributes && { attributes }),
    };

    try {
      const messageId = await this.pubSub
        .topic(topicNameOrId)
        .publishMessage(messsage);
      console.log(`Message ${messageId} published.`);
      return messageId;
    } catch (error) {
      console.error(`Error occured while publishing: ${error.message}`);
      throw error;
    }
  }

  formatMessageData<T>(
    pubSubMessage: PubSubMessageDto,
    resourceType: ClassConstructor<T>,
  ): T {
    const {
      message: { data },
    } = pubSubMessage;

    const bufferObj = Buffer.from(data, 'base64');
    const decodedData = bufferObj.toString('utf8');
    const jsonObj = JSON.parse(decodedData);

    const result = plainToInstance<T, PubSubMessageDto>(
      resourceType,
      jsonObj,
    ) as T;

    return result;
  }
}
