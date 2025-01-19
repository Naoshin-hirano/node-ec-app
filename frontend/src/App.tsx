import { Routes, Route } from "react-router-dom"; // 追加
import SignUpPage from "./pages/auth/signup";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";
import SignInPage from "./pages/auth/signin";
import CheckOutPage from "./pages/chekout";
import ProductDetailPage from "./pages/product-detail";
import ProductListPage from "./pages/product-list";

function App() {
    return (
        <div>
            <div>グローバルヘッダー</div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/checkout" element={<CheckOutPage />} />
                <Route path="/productDetail" element={<ProductDetailPage />} />
                <Route path="/productList" element={<ProductListPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
