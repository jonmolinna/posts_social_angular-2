import { bookMarkInterface } from './bookMark.interface';
import { commentInterface } from './comment.interface';
import { likeInterface } from './like.interface';
import { userInterface } from './user.interface';

export interface postInterface {
  _id: string;
  imagen_url: string;
  imagen_id: string;
  comment: string;
  user: userInterface;
  createdAt: Date;
  bookMarks: bookMarkInterface[];
  comments: commentInterface[];
  likes: likeInterface[];
}
