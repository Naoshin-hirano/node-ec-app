import { useState } from "react";
import { Link } from "react-router-dom"; // 追加

function SignInPage() {
    const [valueObj, setValueObj] = useState({
        user_id: "",
        password: "",
    });
    const handleChange = (key: string, value: string) => {
        setValueObj({ ...valueObj, [key]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("サブミットされました", e.target);
    };
    return (
        <div className="Home">
            <h1>ログイン画面</h1>
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={valueObj.user_id}
                        onChange={(e) =>
                            handleChange("user_id", e.target.value)
                        }
                        placeholder="ユーザーID"
                        required
                    />
                    <input
                        type="password"
                        value={valueObj.password}
                        onChange={(e) =>
                            handleChange("password", e.target.value)
                        }
                        placeholder="パスワード"
                        required
                    />
                    {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
                    <button type="submit">ログイン</button>
                </form>
            </div>
            <div>
                <Link to="/signup">signup画面へ</Link>
            </div>
            <div>
                <Link to="/">Home画面へ</Link>
            </div>
        </div>
    );
}

export default SignInPage;
