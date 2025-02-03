import { Routes, Route } from "react-router-dom"; // 追加
import SignUpPage from "./pages/auth/signup";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";
import SignInPage from "./pages/auth/signin";
import CheckOutPage from "./pages/chekout";
import ProductDetailPage from "./pages/product-detail";
import ProductListPage from "./pages/product-list";
import { useEffect, useState } from "react";
import axios from "axios";
import PrivateLayout from "./components/layout/PrivateLayout";
import PublicLayout from "./components/layout/PublicLayout";
import { useAtom } from "jotai";
import { userAtom } from "./store/user";

// クッキーも一緒にリクエスト送信
axios.defaults.withCredentials = true;

function App() {
    const [user, setUser] = useAtom(userAtom);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const url = "http://localhost:3000/user/getme";
                const response = await axios.get(url);
                const userObj = response.data.user;
                setUser(userObj);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return !loading ? (
        <Routes>
            <Route element={<PrivateLayout isAuthenticated={user} />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/checkout" element={<CheckOutPage />} />
                <Route path="/productDetail" element={<ProductDetailPage />} />
                <Route path="/productList" element={<ProductListPage />} />
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
