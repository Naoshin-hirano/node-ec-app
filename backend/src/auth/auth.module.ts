import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/common/localStrategy';
import { UserModule } from 'src/users/user.module';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [UserService, LocalStrategy],
})
export class AuthModule {}
