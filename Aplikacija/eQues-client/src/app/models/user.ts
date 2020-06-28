import { Role } from './role';
import { Image } from './image';

export class User {
    id: number;
    roleId: number;
    name: string;
    lastname: string;
    studentId: string;
    email: string;
    image: Image;
    password: string;
    confirmPassword: string;
    studentYearId: number;
    moduleId: number;
    accessToken: string;
}
