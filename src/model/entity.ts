

export type UserRole = "Admin" | "Representative" | "User";

export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
}

