import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { Response } from 'express';
import { EditUserDto } from './dto/editUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getme')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  async getMe(
    @Session() session: Record<string, any>,
    @Res() response: Response,
  ): Promise<void> {
    // sessionを保存しているテーブルに、リクエストのcookieのsessionIdと結びつくテーブルがあるかチェック
    if (!session.user) {
      response.status(HttpStatus.FORBIDDEN).json({ user: null });
    } else {
      response.status(HttpStatus.OK).json({
        user: {
          id: session.user.id,
          name: session.user.name,
          employee_number: session.user.employee_number,
          role: session.user.role,
        },
      });
    }
  }

  @Post('editme')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  async editMe(
    @Body() editUserDto: EditUserDto,
    @Session() session: Record<string, any>,
    @Res() response: Response,
  ): Promise<void> {
    try {
      console.log('あああ');
      await this.userService.update(editUserDto);
      session.user = {
        ...session.user,
        name: editUserDto.name,
        role: editUserDto.role,
      };
      response.status(HttpStatus.OK).json({
        user: {
          id: session.user.id,
          name: session.user.name,
          employee_number: session.user.employee_number,
          role: session.user.role,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
