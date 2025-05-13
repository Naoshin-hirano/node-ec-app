import { Routes, Route } from "react-router-dom"; // 追加
import SignUpPage from "./ui/pages/signup";
import HomePage from "./ui/pages/home";
import NotFoundPage from "./ui/pages/not-found";
import SignInPage from "./ui/pages/signin";
import CheckOutPage from "./ui/pages/checkout";
import ProductDetailPage from "./ui/pages/product-detail";
import ProductListPage from "./ui/pages/product-list";
import PrivateLayout from "./ui/components/molecules/PrivateLayout";
import PublicLayout from "./ui/components/molecules/PublicLayout";
import UserSettingPage from "./ui/pages/setting";
import { useApp } from "./hooks/useApp";

function App() {
    const { user, loading } = useApp();
    return !loading ? (
        <Routes>
            <Route element={<PrivateLayout isAuthenticated={user} />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/checkout" element={<CheckOutPage />} />
                <Route path="/productDetail" element={<ProductDetailPage />} />
                <Route path="/productList" element={<ProductListPage />} />
                <Route path="/userSetting" element={<UserSettingPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route element={<PublicLayout />}>
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signin" element={<SignInPage />} />
            </Route>
        </Routes>
    ) : (
        <div>loading...</div>
    );
}

export default App;
