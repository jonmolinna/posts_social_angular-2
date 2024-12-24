import { likeInterface } from './like.interface';
import { userInterface } from './user.interface';

export interface postInterface {
  _id: string;
  imagen_url: string;
  imagen_id: string;
  comment: string;
  user: userInterface;
  createdAt: Date;
  bookMarks: BookMark[];
  comments: Comment[];
  likes: likeInterface[];
}

/////------------------ DELETE
export interface BookMark {
  createdAt: Date;
  user: userInterface;
  _id: string;
  __v: number;
  comment?: string;
}

export interface Comment {
  comment: string;
  createdAt: Date;
  user: userInterface;
  _id: string;
  __v: number;
}
