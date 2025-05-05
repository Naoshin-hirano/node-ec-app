import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as pgSession from 'connect-pg-simple';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );

  app.set('trust proxy', 1); // Herokuでは必須
  app.enableCors({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: true,
  });
  app.use(cookieParser());
  const pgSessionStore = pgSession(session);
  app.use(
    session({
      store: new pgSessionStore({
        conObject: {
          connectionString: process.env.DATABASE_URL, // DATABASE_URLを指定
          ssl: {
            rejectUnauthorized: false, // HerokuのSSL設定
          },
        },
        // テーブルが存在しなければ新規作成する
        createTableIfMissing: true,
      }),
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        secure: process.env.NODE_ENV === 'production', // ローカルはfalse、本番はtrue
        httpOnly: true,
        sameSite: 'none',
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
