import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/signupUser.dto';
import { EditUserDto } from './dto/editUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  save(signUpDto: SignUpUserDto) {
    return this.userRepository.save(signUpDto);
  }

  delete(employee_number: string) {
    return this.userRepository.delete(employee_number);
  }

  findByUsername(employee_number: string) {
    return this.userRepository.findOneBy({ employee_number });
  }

  async update(editUserDto: EditUserDto) {
    const employee_number = editUserDto.employee_number;
    const user = await this.userRepository.findOneBy({ employee_number });
    user.name = editUserDto.name;
    user.role = editUserDto.role;
    return this.userRepository.save(user);
  }
}
