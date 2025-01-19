import { Link } from "react-router-dom";

function ProductDetailPage() {
    return (
        <div className="ProductDetailPage">
            <h1>商品詳細画面です</h1>
            <Link to="/">ホーム画面へ</Link>
        </div>
    );
}

export default ProductDetailPage;
