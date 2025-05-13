import { useNavigate } from "react-router-dom";
import { userAtom } from "../store/user";
import { useAtom } from "jotai";
import { logout } from "../core/controllers/authController";

export const useHome = () => {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(userAtom);
    const onLogout = () => {
        const fetch = async () => {
            const result = await logout();
            if (result) {
                setUser(null);
                navigate("/signin");
            }
        };
        fetch();
    };

    return {
        user,
        onLogout,
    };
};
