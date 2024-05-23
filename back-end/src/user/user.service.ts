import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly kafkaService: KafkaService,
    ) {}

    async createUser(name: string, email: string) {
        const user = this.userRepository.create({ name, email });
        await this.userRepository.save(user);
        await this.kafkaService.sendMessage('user-topic', {
            value: JSON.stringify(user),
        });

        return user;
    }

    async getUser(id: number) {
        return await this.userRepository.findOne({ where: { id } });
    }
}
