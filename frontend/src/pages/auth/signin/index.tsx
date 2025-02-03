import axios from "axios";
import { useAtom } from "jotai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 追加
import { userAtom } from "../../../store/user";

// クッキーも一緒にリクエスト送信
axios.defaults.withCredentials = true;

function SignInPage() {
    const navigate = useNavigate();
    const [, setUser] = useAtom(userAtom);
    const [valueObj, setValueObj] = useState({
        employee_number: "",
        password: "",
    });
    const handleChange = (key: string, value: string) => {
        setValueObj({ ...valueObj, [key]: value });
    };

    const onLogin = async () => {
        try {
            const url = "http://localhost:3000/auth/login";
            const reqBody = {
                ...valueObj,
            };
            const response = await axios.post(url, reqBody);
            if (response.status === 200) {
                setValueObj({
                    employee_number: "",
                    password: "",
                });
                console.log("login", response.data.user);
                setUser(response.data.user);
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (valueObj.employee_number && valueObj.employee_number.length !== 5) {
            return alert("社員番号は5文字で入力してください");
        } else if (!valueObj.employee_number || !valueObj.password) {
            return alert("入力がない項目があります");
        }
        onLogin();
    };
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
