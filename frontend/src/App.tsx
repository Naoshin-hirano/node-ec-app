import { Routes, Route } from "react-router-dom"; // 追加
import SignUpPage from "./ui/pages/auth/signup";
import HomePage from "./ui/pages/home";
import NotFoundPage from "./ui/pages/not-found";
import SignInPage from "./ui/pages/auth/signin";
import CheckOutPage from "./ui/pages/chekout";
import ProductDetailPage from "./ui/pages/product-detail";
import ProductListPage from "./ui/pages/product-list";
import { useEffect } from "react";
import PrivateLayout from "./ui/components/layout/PrivateLayout";
import PublicLayout from "./ui/components/layout/PublicLayout";
import { useAtom } from "jotai";
import { userAtom } from "./store/user";
import { loadingAtom } from "./store/loadiing";
import { getMe } from "./core/controllers/userController";

function App() {
    const [user, setUser] = useAtom(userAtom);
    const [loading, setLoading] = useAtom(loadingAtom);

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getMe();
                const userObj = result.user;
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
