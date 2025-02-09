import { ApiClient } from "../api/apiClient";

/**
 * ユーザーサービス
 */
export class UserService {
    constructor() {}

    /**
     * ログイン中アカウントのユーザー情報取得
     * @returns
     */
    public async getMe() {
        const response = await ApiClient.get("/user/getme");
        return response.data;
    }

    /**
     * ログイン中アカウントのユーザー情報更新
     * @param body
     * @returns
     */
    public async editMe(body: any) {
        const response = await ApiClient.post("/user/editme", body);
        return response.data;
    }
}
