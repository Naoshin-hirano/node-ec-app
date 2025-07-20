import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userAtom } from "../../../../store/user";
import { logIn } from "../../../../core/controllers/authController";

export const useSignin = () => {
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
            const reqBody = {
                ...valueObj,
            };
            const result = await logIn(reqBody);
            setValueObj({
                employee_number: "",
                password: "",
            });
            setUser(result.user);
            navigate("/");
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

    return {
        valueObj,
        handleChange,
        handleSubmit,
    };
};
