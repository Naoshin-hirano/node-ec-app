import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret: 'secretKey123',
    //   signOptions: {
    //     expiresIn: 3600,
    //   },
    // }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
