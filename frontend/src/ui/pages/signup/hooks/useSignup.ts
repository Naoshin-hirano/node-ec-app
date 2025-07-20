import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../../core/controllers/authController";

export const useSignup = () => {
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

    return {
        valueObj,
        handleChange,
        handleSubmit,
    };
};
