import { useAtom } from "jotai";
import { userAtom } from "../../../store/user";

export default function Header() {
    const [user] = useAtom(userAtom);
    return (
        <div
            className="header"
            style={{
                height: "50px",
                backgroundColor: "orange",
                lineHeight: "50px",
                paddingLeft: "20px",
            }}
        >
            <div>
                ユーザー名: <span>{user?.name}</span>
            </div>
        </div>
    );
}
