import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/signupUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  save(signUpDto: SignUpUserDto) {
    return this.userRepository.save(signUpDto);
  }

  findByUsername(employee_number: string) {
    return this.userRepository.findOneBy({ employee_number });
  }
}
