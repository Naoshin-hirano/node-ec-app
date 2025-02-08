import { Navigate } from "react-router-dom";
import Header from "./Header";
import Layout from "./Layout";

export default function PrivateLayout({ isAuthenticated }: any) {
    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }
    return (
        <>
            <Header />
            <Layout />
        </>
    );
}
