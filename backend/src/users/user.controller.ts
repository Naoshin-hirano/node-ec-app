import { Controller, Get, Post, Req, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ログインユーザー情報を取得
  @Get('profile')
  findBySession() {}

  // ログアウト
  @Post('signout')
  async singOut() {
    return await this.userService.signOut();
  }

  // 新規登録
  @Post('signup')
  async singUp(
    @Session() session: Record<string, any>,
    @Req() request: Request,
  ) {
    session.visits = session.visits ? session.visits + 1 : 1;
    console.log('セッションID', session.id);
    console.log('リクエストのクッキー', request.cookies);
    return session;
  }

  // ログイン
  @Post('signin')
  async signIn(@Req() request: Request) {
    console.log('リクエストのSessionId', request.session.id);
    return request.session.cookie;
  }
}
