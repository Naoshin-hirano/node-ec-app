import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());

  app.use(
    session({
      name: 'NEST_SESSION_ID',
      secret: [
        'veryimportantsecret',
        'notsoimportantsecret',
        'highlyprobablysecret',
      ],
      resave: false,
      saveUninitialized: false,
      cookie: { path: '/', secure: false, httpOnly: true },
    }),
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
