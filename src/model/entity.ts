
export interface Plan {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    programs: Program[];
}

type UserRole = "Admin" | "Representative" | "User";

export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
}

export interface Program {
    id: number;
    planId: number;
    title: string;
    description: string;
    deadline: Date;
    userId: string;
}