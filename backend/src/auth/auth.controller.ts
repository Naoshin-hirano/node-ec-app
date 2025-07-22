import { Body, Controller, Post, Session } from '@nestjs/common';
import { LocalStrategy } from 'src/common/localStrategy';
import { UserService } from 'src/users/user.service';
import { LogInUserDto } from 'src/users/dto/loginUser.dto';
import { SignUpUserDto } from 'src/users/dto/signupUser.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private localStrategy: LocalStrategy,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signUp(
    @Body() signUpUserDto: SignUpUserDto,
  ): Promise<{ message: string }> {
    const saltOrRounds = 10;
    const password = signUpUserDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newSignUpUserDto = { ...signUpUserDto, password: hashedPassword };
    await this.userService.save(newSignUpUserDto);
    return { message: 'メンバー登録完了' };
  }

  @Post('delete')
  async delete(
    @Body() employee_number: string,
    @Session() session: Record<string, any>,
  ) {
    await this.userService.delete(employee_number);
    session.destroy();
    return { message: 'メンバー退会完了' };
  }

  @Post('login')
  async logIn(
    @Body() logInUserDto: LogInUserDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.localStrategy.validate(
      logInUserDto.employee_number,
      logInUserDto.password,
    );
    session.user = user;
    return {
      user: {
        id: user.id,
        name: user.name,
        employee_number: user.employee_number,
        role: user.role,
      },
    };
  }

  @Post('logout')
  async logout(
    @Session() session: Record<string, any>,
  ): Promise<{ message: string }> {
    session.destroy();
    return { message: 'ログアウト成功' };
  }
}
