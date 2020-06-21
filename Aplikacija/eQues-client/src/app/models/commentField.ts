import { Comment } from './comment';
import { User } from './User';

export class CommentField {
  constructor(comment: Comment, user: User) {
    this.comment = comment;
    this.user = user;
  }
  comment: Comment;
  user: User;
}
