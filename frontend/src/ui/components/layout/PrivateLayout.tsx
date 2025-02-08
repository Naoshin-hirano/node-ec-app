import { Navigate, Outlet } from "react-router-dom";

export default function PrivateLayout({ isAuthenticated }: any) {
    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }
    return <Outlet />;
}
