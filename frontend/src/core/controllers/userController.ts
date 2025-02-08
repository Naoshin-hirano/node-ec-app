import { UserService } from "../services/userService";

/**
 * ログイン中アカウントのユーザー情報取得
 * @returns
 */
export const getMe = () => {
    const service = new UserService().getMe();
    return service;
};
