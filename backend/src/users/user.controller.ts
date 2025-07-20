import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { EditUserDto } from './dto/editUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getme')
  async getMe(
    @Session() session: Record<string, any>,
  ): Promise<{ user: Record<string, any> }> {
    // sessionを保存しているテーブルに、リクエストのcookieのsessionIdと結びつくテーブルがあるかチェック
    if (!session.user) {
      return { user: null };
    } else {
      return {
        user: {
          id: session.user.id,
          name: session.user.name,
          employee_number: session.user.employee_number,
          role: session.user.role,
        },
      };
    }
  }

  @Post('editme')
  async editMe(
    @Body() editUserDto: EditUserDto,
    @Session() session: Record<string, any>,
  ): Promise<{ user: Record<string, any> }> {
    await this.userService.update(editUserDto);
    session.user = {
      ...session.user,
      name: editUserDto.name,
      role: editUserDto.role,
    };
    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        employee_number: session.user.employee_number,
        role: session.user.role,
      },
    };
  }
}
