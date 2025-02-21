import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as pgSession from 'connect-pg-simple';

async function bootstrap() {
  console.log('ああああ');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: true,
  });
  app.use(cookieParser());
  const pgSessionStore = pgSession(session);
  app.use(
    session({
      store: new pgSessionStore({
        // DATABASE_URLを指定
        conString: process.env.DATABASE_URL,
        // テーブルが存在しなければ新規作成する
        createTableIfMissing: true,
      }),
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { path: '/', secure: false, httpOnly: true },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
