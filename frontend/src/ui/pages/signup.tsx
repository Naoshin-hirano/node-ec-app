import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

function SignUpPage() {
    const { valueObj, handleChange, handleSubmit } = useSignup();
    return (
        <div className="Register">
            <h1>アカウント新規登録画面</h1>
            <form onSubmit={handleSubmit} className="Form">
                <input
                    type="text"
                    placeholder="社員番号"
                    value={valueObj.employee_number}
                    onChange={(e) => {
                        handleChange("employee_number", e.target.value);
                    }}
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
