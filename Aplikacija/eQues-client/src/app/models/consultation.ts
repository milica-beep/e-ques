import { Subject } from './subject';
import { User } from './User';

export class Consultation {
  id: number;
  date: String;
  time: String;
  subjectId: number;
  professor: User;
}
