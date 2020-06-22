import { Role } from './role';

export class User {
    id: number;
    roleId: number;
    name: string;
    lastname: string;
    studentId: string;
    email: string;
    password: string;
    confirmPassword: string;
    studentYearId: number;
    moduleId: number;
    accessToken: string;
}
