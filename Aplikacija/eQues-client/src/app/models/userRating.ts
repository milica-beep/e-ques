import { Grade } from './grade';

export class userRating {
  constructor(grade: Grade, answerId: number) {
    this.grade = grade;
    this.answerId = answerId;
  }
  grade: Grade;
  answerId: number;
}
