import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTopicSubscription } from 'libs/shared/interfaces/createTopicSubscription.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('process.env.NODE_ENV', process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'development') {
    const appService = app.get<AppService>(AppService);
    console.log('Creating topics on pub-sub...');
    const topicsRequired = ['create-owner'];
    await appService.createTopics(topicsRequired);

    console.log('Creating topic subscriptions...');
    const topicSubscriptions: CreateTopicSubscription[] = [
      {
        topicNameOrId: 'create-owner',
        subscriptionNameOrId: 'create-owner-handler',
        pushEndpoint: 'http://first-project-dev:8080/owner-handler',
      },
    ];
    await appService.createSubscriptions(topicSubscriptions);
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
}
bootstrap();
