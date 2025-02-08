import { atom } from "jotai";

interface User {
    employee_number: string;
    password: string;
    name: string;
    role: string;
}

// userアカウント情報
export const userAtom = atom<User | null>(null);
