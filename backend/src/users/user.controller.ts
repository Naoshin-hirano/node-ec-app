import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  Session,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UserController {
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
}
