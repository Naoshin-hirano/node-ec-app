import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { LocalStrategy } from 'src/common/localStrategy';
import { UserService } from 'src/users/user.service';
import { Response } from 'express';
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
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body() signUpUserDto: SignUpUserDto,
    @Res() response: Response,
  ) {
    try {
      const saltOrRounds = 10;
      const password = signUpUserDto.password;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const newSignUpUserDto = { ...signUpUserDto, password: hashedPassword };
      await this.userService.save(newSignUpUserDto);
      response.status(HttpStatus.OK).json({ message: 'メンバー登録完了' });
    } catch (err) {
      throw new Error(err);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(
    @Body() logInUserDto: LogInUserDto,
    @Session() session: Record<string, any>,
    @Res() response: Response,
  ) {
    const user = await this.localStrategy.validate(
      logInUserDto.employee_number,
      logInUserDto.password,
    );
    session.user = user;
    response.status(HttpStatus.OK).json({ name: user.name, role: user.role });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Session() session: Record<string, any>,
    @Res() response: Response,
  ): Promise<void> {
    session.destroy();
    response.status(HttpStatus.OK).json({ message: 'ログアウト成功' });
  }
}
