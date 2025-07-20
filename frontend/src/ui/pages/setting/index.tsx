import { Link } from "react-router-dom"; // 追加
import { useSetting } from "./hooks/useSetting";

function UserSettingPage() {
    const { editUser, editableFlag, onDelete, handleChange, onEditUserInfo } =
        useSetting();

    return (
        <div className="Home">
            <h1>アカウント設定画面</h1>
            <div style={{ marginBottom: "30px" }}>
                <div>
                    <input
                        type="text"
                        name="name"
                        value={editUser.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>
                <div>
                    <select
                        name="role"
                        value={editUser.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                    >
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <div>
                    <button onClick={onEditUserInfo} disabled={!editableFlag}>
                        ユーザー情報の変更
                    </button>
                </div>
            </div>
            <div>
                <button onClick={onDelete}>アカウント退会</button>
            </div>
            <div>
                <Link to="/">Home画面へ</Link>
            </div>
        </div>
    );
}

export default UserSettingPage;
