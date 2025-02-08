import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom"; // 追加
import { userAtom } from "../../../../store/user";
import { deleteAccount } from "../../../../core/controllers/authController";

function UserSettingPage() {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(userAtom);

    const onDelete = async () => {
        try {
            if (!user) {
                navigate("/signin");
                return;
            }
            const deleteOkFlag = confirm("アカウント削除してよろしいですか");
            if (deleteOkFlag) {
                const employee_number = user.employee_number;
                const reqBody = {
                    employee_number,
                };
                const result = await deleteAccount(reqBody);
                if (result) {
                    setUser(null);
                    alert("メンバー退会完了しました");
                    navigate("/signup");
                }
            } else {
                alert("メンバー退会をキャンセルしました");
            }
        } catch (err) {
            console.error(err);
            alert("メンバー退会に失敗しました");
        }
    };
    return (
        <div className="Home">
            <h1>アカウント設定画面</h1>
            <button onClick={onDelete}>アカウント退会</button>
            <div>
                <Link to="/">Home画面へ</Link>
            </div>
        </div>
    );
}

export default UserSettingPage;
