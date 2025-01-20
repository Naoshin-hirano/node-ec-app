import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  // ログインユーザー情報を取得
  // todo: requestの型をRequestにするとcookiesでエラーが出るので要調査
  async findBySession(request: any) {
    // 開発者ツールのネットワークタブの「cookies」タブから送信されたjwtを受け取る
    // const cookie = request.cookies['jwt'];
    // jwtをユーザー情報にデコード
    // const user = await this.jwtService.verifyAsync(cookie);
    // Usersオブジェクトで返却
    // const loginUser = await this.usersRepository.findOne({ id: user.id });
    return 'findBySession servie';
  }

  // ログアウト
  async signOut(response: any) {
    // ブラウザのcookieを削除
    // response.clearCookie('jwt');
    // return {
    //   message: true,
    // };
    return 'signOut service';
  }

  // 新規登録
  async singUp(createUserDto: any): Promise<any> {
    // const { username, password } = createUserDto;
    // const salt = await bcrypt.genSalt();
    // const hashpassword = await bcrypt.hash(password, salt);
    // const imageURL =
    //   'https://res.cloudinary.com/dq8na8c7e/image/upload/v1673684134/react-nest-ec-project/98D3B03A-54B3-4976-818A-81F24F0BDD27_npq9oq.jpg';
    // const user = this.usersRepository.create({
    //   username,
    //   password: hashpassword,
    //   imageURL: imageURL,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // });

    // await this.userRepository.save(user);
    return 'signUp service';
  }

  // ログイン
  async signIn(credentialsDto: any, response: any): Promise<any> {
    // const { username, password } = credentialsDto;
    // const user = await this.usersRepository.findOne({ username });

    // // リクエストのpasswordとDBのtokenを元に戻したpasswordを比較する
    // if (user && (await bcrypt.compare(password, user.password))) {
    //   const payload = {
    //     id: user.id,
    //     password: user.password,
    //     username: user.username,
    //   };
    //   // id, password, usernameをtokenに変換して返す
    //   const accessToken = await this.jwtService.sign(payload);

    //   response.cookie('jwt', accessToken, { httpOnly: true });

    //   return {
    //     id: payload.id,
    //     password: payload.password,
    //     username: payload.username,
    //     imageURL: user.imageURL,
    //   };
    // }
    // throw new UnauthorizedException(
    //   '入力したユーザー名またはパスワードが存在しません',
    // );
    return 'signIn service';
  }
}
