import { Link } from "react-router-dom"; // 追加
import { useSignin } from "./hooks/useSignin";

function SignInPage() {
    const { valueObj, handleChange, handleSubmit } = useSignin();
    return (
        <div className="Home">
            <h1>ログイン画面</h1>
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={valueObj.employee_number}
                        onChange={(e) =>
                            handleChange("employee_number", e.target.value)
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
