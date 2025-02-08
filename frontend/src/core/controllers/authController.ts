import { AuthorityService } from "../services/authService";

/**
 * ユーザーアカウント登録
 * @param body
 * @returns
 */
export const signUp = (body: any) => {
    const service = new AuthorityService().signUp(body);
    return service;
};

/**
 * ユーザーログイン
 * @param body
 * @returns
 */
export const logIn = (body: any) => {
    const service = new AuthorityService().logIn(body);
    return service;
};

/**
 * ユーザーログアウト
 * @returns
 */
export const logout = () => {
    const service = new AuthorityService().logout();
    return service;
};
