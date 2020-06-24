import { Grade } from './grade';

export class Answer {
  id: number;
  text: string;
  isPinned: boolean;
  averageGrade: number;
  grades: Grade[];
  timestampStr: string;
  questionId: number;
  userId: number;
}
