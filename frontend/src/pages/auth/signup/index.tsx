import { useState } from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
    const [valueObj, setValueObj] = useState({
        user_id: "",
        password: "",
        confirmed_password: "",
    });
    const handleChange = (key: string, value: string) => {
        setValueObj({ ...valueObj, [key]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("サブミットされました", e.target);
    };
    return (
        <div className="Register">
            <h1>アカウント新規登録画面</h1>
            <form onSubmit={handleSubmit} className="Form">
                <input
                    type="text"
                    placeholder="ユーザーID"
                    value={valueObj.user_id}
                    onChange={(e) => handleChange("user_id", e.target.value)}
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={valueObj.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                />
                <input
                    type="password"
                    placeholder="確認パスワード"
                    value={valueObj.confirmed_password}
                    onChange={(e) =>
                        handleChange("confirmed_password", e.target.value)
                    }
                />
                <button type="submit">登録</button>
            </form>
            <div>
                <div>
                    <Link to="/signin">signin画面へ</Link>
                </div>
                <div>
                    <Link to="/">Home画面へ</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
