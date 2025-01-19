import { Link } from "react-router-dom"; // 追加

function HomePage() {
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
