import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom"; // 追加

function HomePage() {
    useEffect(() => {
        const fetch = async () => {
            const url = "http://localhost:3000/user/profile";
            const response = await axios.get(url);
            console.log("レスポンス", response.data);
        };
        fetch();
    }, []);

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
