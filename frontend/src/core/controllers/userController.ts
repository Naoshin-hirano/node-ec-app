import { UserService } from "../services/userService";

/**
 * ログイン中アカウントのユーザー情報取得
 * @returns
 */
export const getMe = () => {
    const service = new UserService().getMe();
    return service;
};

/**
 * ログイン中アカウントのユーザー情報更新
 * @returns
 */
export const editMe = (body: any) => {
    const service = new UserService().editMe(body);
    return service;
};
