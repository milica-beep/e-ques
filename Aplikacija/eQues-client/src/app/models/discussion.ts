import { Answer } from './answer';
import { User } from './User';
import { Comment } from './Comment';
import { CommentField } from './commentField';

export class DiscussionField {
  answer: Answer;
  answerUser: User;
  comments: CommentField[];
}
