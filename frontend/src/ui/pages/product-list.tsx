import { Link } from "react-router-dom";

function ProductListPage() {
    return (
        <div className="ProductListPage">
            <h1>商品一覧画面です</h1>
            <Link to="/">ホーム画面へ</Link>
        </div>
    );
}

export default ProductListPage;
