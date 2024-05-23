import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaConfig } from 'src/config/kafka.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        ...kafkaConfig,
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
