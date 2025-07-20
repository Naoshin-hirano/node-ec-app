import { Link } from "react-router-dom"; // 追加
import { useHome } from "./hooks/useHome";

function HomePage() {
    const { user, onLogout } = useHome();
    return (
        <div className="Home">
            <h1>ホーム画面</h1>
            <div>
                {menuList.map(
                    (item: { url: string; msg: string }, index: number) => {
                        return (
                            <div key={index}>
                                <Link to={item.url}>{item.msg}</Link>
                            </div>
                        );
                    }
                )}
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

const menuList = [
    { url: "/signup", msg: "signup画面へ" },
    { url: "/signin", msg: "signin画面へ" },
    { url: "userSetting", msg: "ユーザー設定画面へ" },
    { url: "/checkout", msg: "checkout画面へ" },
    { url: "/productDetail", msg: "商品詳細画面へ" },
    { url: "/productList", msg: "商品一覧画面へ" },
];
