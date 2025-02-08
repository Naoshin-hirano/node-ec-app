import { ApiClient } from "../api/apiClient";

/**
 * 権限サービス
 */
export class AuthorityService {
    constructor() {}

    /**
     * ユーザーアカウント登録
     * @param body
     * @returns
     */
    public async signUp(body: any) {
        const response = await ApiClient.post("/auth/signup", body);
        return response.data;
    }

    /**
     * ユーザーアカウント削除
     * @param body
     * @returns
     */
    public async delete(body: any) {
        const response = await ApiClient.post("/auth/delete", body);
        return response.data;
    }

    /**
     * ユーザーログイン
     * @param body
     * @returns
     */
    public async logIn(body: any) {
        const response = await ApiClient.post("/auth/login", body);
        return response.data;
    }

    /**
     * ユーザーログアウト
     * @returns
     */
    public async logout() {
        const response = await ApiClient.post("/auth/logout");
        return response.data;
    }
}
