import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userAtom } from "../../../../store/user";
import { deleteAccount } from "../../../../core/controllers/authController";
import { editMe } from "../../../../core/controllers/userController";

export const useSetting = () => {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(userAtom);
    const [editUser, setEditUser] = useState({
        name: user?.name,
        role: user?.role,
    });

    const editableFlag =
        user?.name !== editUser.name || user?.role !== editUser.role;

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

    const handleChange = (key: string, value: string) => {
        setEditUser({ ...editUser, [key]: value });
    };

    const onEditUserInfo = async () => {
        const reqBody = {
            ...editUser,
            employee_number: user?.employee_number,
        };
        try {
            const result = await editMe(reqBody);
            if (result) {
                const newUserInfo = {
                    ...result.user,
                };
                setUser(newUserInfo);
                alert("ユーザー情報を更新しました");
            }
        } catch (err) {
            console.error(err);
            alert("ユーザー情報の更新に失敗しました");
        }
    };

    return {
        editUser,
        editableFlag,
        onDelete,
        handleChange,
        onEditUserInfo,
    };
};
