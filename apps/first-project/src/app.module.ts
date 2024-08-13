import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubSubClientModule } from '@app/common-services/pub-sub-client';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';

@Module({
  imports: [
    PubSubClientModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Owner],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Owner]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
