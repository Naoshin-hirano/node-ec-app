import axios from "axios";
import { Link } from "react-router-dom"; // 追加

// クッキーも一緒にリクエスト送信
axios.defaults.withCredentials = true;

function HomePage() {
    const onLogin = () => {
        const fetch = async () => {
            const url = "http://localhost:3000/user/signin";
            const response = await axios.post(url);
            console.log("レスポンス", response.data);
        };
        fetch();
    };

    const onSignup = () => {
        const fetch = async () => {
            const url = "http://localhost:3000/user/signup";
            const response = await axios.post(url);
            console.log("レスポンスSignup", response.data);
        };
        fetch();
    };

    return (
        <div className="Home">
            <h1>ホーム画面</h1>
            <div>
                <button onClick={onSignup}>登録</button>
            </div>
            <div>
                <button onClick={onLogin}>ログイン</button>
            </div>

            <div>
                <div>
                    <Link to="/signup">signup画面へ</Link>
                </div>
                <div>
                    <Link to="/signin">signin画面へ</Link>
                </div>
                <div>
                    <Link to="/checkout">checkout画面へ</Link>
                </div>
                <div>
                    <Link to="/productDetail">商品詳細画面へ</Link>
                </div>
                <div>
                    <Link to="/productList">商品一覧画面へ</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
