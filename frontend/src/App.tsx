import { Routes, Route } from "react-router-dom"; // 追加
import SignUpPage from "./pages/auth/signup";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";
import SignInPage from "./pages/auth/signin";
import CheckOutPage from "./pages/chekout";
import ProductDetailPage from "./pages/product-detail";
import ProductListPage from "./pages/product-list";
import { useEffect } from "react";
import PrivateLayout from "./components/layout/PrivateLayout";
import PublicLayout from "./components/layout/PublicLayout";
import { useAtom } from "jotai";
import { userAtom } from "./store/user";
import { loadingAtom } from "./store/loadiing";
import { ApiClient } from "./core/api/apiClient";

function App() {
    const [user, setUser] = useAtom(userAtom);
    const [loading, setLoading] = useAtom(loadingAtom);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await ApiClient.get("/user/getme");
                const userObj = response.data.user;
                setUser(userObj);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
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
