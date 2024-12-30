import { userInterface } from './user.interface';

export interface commentInterface {
  comment: string;
  createdAt: Date;
  user: userInterface;
  post: string;
  _id: string;
}
