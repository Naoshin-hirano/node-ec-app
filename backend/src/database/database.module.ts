import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const ENTITIES_DIR = 'dist/**/*.entity.js';
export const MIGRATION_FILES_DIR = 'dist/database/migrations/*.js';

@Module({
  imports: [
    // typeormの利用
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = process.env.NODE_ENV === 'production';
        return {
          type: 'postgres',
          // Herokuだとhostなどプロパティで設定できないのでurlで設定
          ...(isProduction
            ? {
                url: configService.get<string>('DATABASE_URL'),
                ssl: {
                  rejectUnauthorized: false,
                },
              }
            : {
                host: configService.get<string>('DATABASE_HOST'),
                port: Number(configService.get<string>('DATABASE_PORT')),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
              }),
          entities: [ENTITIES_DIR],
          synchronize: false,
          migrations: [MIGRATION_FILES_DIR],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
