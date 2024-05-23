import { Controller, Post, Body, Get, Param, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto.name, createUserDto.email);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        return this.userService.getUser(id);
    }
}
