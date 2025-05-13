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

  // 最前段の1つのプロキシ（Heroku）を信頼 ＝ Herokuからのヘッダー（例：X-Forwarded-For, X-Forwarded-Proto）を信頼して使う
  app.set('trust proxy', 1);
  app.enableCors({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: true,
  });
  // Cookie を解析し、req.cookies に格納（express-sessionがセッションIDを取り出すときに必要）
  // なのでexpress-sessionより先に書く必要ある
  app.use(cookieParser());
  const pgSessionStore = pgSession(session);
  app.use(
    session({
      store: new pgSessionStore({
        conObject: {
          connectionString: process.env.DATABASE_URL, // DATABASE_URLを指定
          // Heroku の PostgreSQL は外部からの接続に SSL を要求
          // サーバー証明書の検証（CAチェック）をスキップしてSSL接続を許可
          // SSLは使いつつ「証明書の完全性検証だけスキップ」する形にする
          // TODO: trueにする設定にしないと中間者攻撃などの標的になるので要対応
          ssl: {
            rejectUnauthorized: false,
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
        // trueにすると、HTTPSでアクセスしているときだけCookieがブラウザに送信される
        // ローカルはfalse、本番はtrue
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        // フロントエンドとバックエンドが別ドメイン
        // secure: true も設定しないと拒否される
        sameSite: 'none',
      },
    }),
  );
  // Passport を有効化（認証機能を使えるようにする）
  app.use(passport.initialize());
  // リクエスト毎にセッション情報から実際のユーザーを取得してsession.userにユーザー情報をセット
  app.use(passport.session());
  // POSTデータ（req.body)がオブジェクトの形にパースされる
  // extended: true にすることでネストされたオブジェクトなど複雑なデータを扱える
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
