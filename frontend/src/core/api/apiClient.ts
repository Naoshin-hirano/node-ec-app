import axios from "axios";
// 環境変数よりエンドポイントを設定 (今回はhttps://jsonplaceholder.typicode.com)
const baseURL = "http://localhost:3000";
// 共通ヘッダー
const headers = {
    "Content-Type": "application/json",
};
// axiosの初期設定
export const ApiClient = axios.create({
    withCredentials: true,
    baseURL,
    headers,
});

// レスポンスのエラー判定処理
ApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        switch (error?.response?.status) {
            case 401:
                break;
            case 404:
                break;
            default:
                alert("エラー！！！！");
                console.log("== internal server error");
        }

        const errorMessage = (error.response?.data?.message || "").split(",");
        throw new Error(errorMessage);
    }
);

// token付与等のリクエスト処理の共通化
ApiClient.interceptors.request.use(async (request: any) => {
    // アクセストークンを取得し共通headerに格納
    // const accessToken = getAccessToken();
    // request.headers["access-token"] = accessToken;
    return request;
});
