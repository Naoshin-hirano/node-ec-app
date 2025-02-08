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
}
