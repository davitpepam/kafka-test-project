import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), KafkaModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}