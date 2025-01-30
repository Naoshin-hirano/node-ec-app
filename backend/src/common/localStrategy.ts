import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from './bcrypt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'employee_number' });
  }

  async validate(employee_number: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByUsername(employee_number);
      const matched = await comparePassword(password, user.password);
      if (user && matched) {
        return user;
      } else if (!user || !matched) {
        throw new UnauthorizedException(
          '社員番号またはパスワードが間違っています',
        );
      }
    } catch {
      throw new UnauthorizedException(
        '社員番号またはパスワードが間違っています',
      );
    }
  }
}
