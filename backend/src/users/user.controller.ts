import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ログインユーザー情報を取得
  @Get('profile')
  findBySession(@Req() request: any) {
    return this.userService.findBySession(request);
  }

  // ログアウト
  @Post('signout')
  async singOut(@Res({ passthrough: true }) response: any) {
    return await this.userService.signOut(response);
  }

  // 新規登録
  @Post('signup')
  async singUp(
    @Body()
    createUserDto: any,
  ): Promise<any> {
    return await this.userService.singUp(createUserDto);
  }

  // ログイン
  @Post('signin')
  async signIn(
    @Body()
    credentialsDto: any,
    @Res({ passthrough: true }) response: any,
  ): Promise<any> {
    return await this.userService.signIn(credentialsDto, response);
  }
}
