import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div style={{ marginRight: "20px", marginLeft: "20px" }}>
            <Outlet />
        </div>
    );
}
