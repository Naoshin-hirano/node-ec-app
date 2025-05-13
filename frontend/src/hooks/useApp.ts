import { useAtom } from "jotai";
import { userAtom } from "../store/user";
import { loadingAtom } from "../store/loadiing";
import { useEffect } from "react";
import { getMe } from "../core/controllers/userController";

export const useApp = () => {
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

    return {
        user,
        loading,
    };
};
