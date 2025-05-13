import { atom } from "jotai";

export type User = {
    employee_number: string;
    password: string;
    name: string;
    role: string;
};

// userアカウント情報
export const userAtom = atom<User | null>(null);
