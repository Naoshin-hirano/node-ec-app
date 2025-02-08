import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../../../core/controllers/authController";

function SignUpPage() {
    const navigate = useNavigate();
    const [valueObj, setValueObj] = useState({
        employee_number: "",
        password: "",
        confirmed_password: "",
    });
    const handleChange = (key: string, value: string) => {
        setValueObj({ ...valueObj, [key]: value });
    };

    const onSignup = async () => {
        try {
            const reqBody = {
                ...valueObj,
                name: "default_user",
                role: "CUSTOMER",
            };
            const result = await signUp(reqBody);
            if (result) {
                setValueObj({
                    employee_number: "",
                    password: "",
                    confirmed_password: "",
                });
                navigate("/signin");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (valueObj.password !== valueObj.confirmed_password) {
            return alert("パスワードが異なります");
        } else if (
            valueObj.employee_number &&
            valueObj.employee_number.length !== 5
        ) {
            return alert("社員番号は5文字で入力してください");
        } else if (
            !valueObj.employee_number ||
            !valueObj.password ||
            !valueObj.confirmed_password
        ) {
            return alert("入力がない項目があります");
        }
        onSignup();
    };
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
