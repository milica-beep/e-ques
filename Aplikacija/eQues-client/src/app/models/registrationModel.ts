import { StudentYear } from './studentYear';
import { Module } from './module';
import { Role } from './role';

export class RegistrationModel {
  studentYears: StudentYear[];
  roles: Role[];
  modules: Module[];
}
