import { Link } from "react-router-dom"; // 追加
import { useHome } from "../../hooks/useHome";

function HomePage() {
    const { user, onLogout } = useHome();
    return (
        <div className="Home">
            <h1>ホーム画面</h1>
            <div>
                <div>
                    <Link to="/signup">signup画面へ</Link>
                </div>
                <div>
                    <Link to="/signin">signin画面へ</Link>
                </div>
                <div>
                    <Link to="/userSetting">ユーザー設定画面へ</Link>
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
            <div>
                <div>
                    <button onClick={onLogout}>ログアウト</button>
                </div>
                <div>{!user ? "ログアウトしました" : "ログインしてます"}</div>
            </div>
        </div>
    );
}

export default HomePage;
