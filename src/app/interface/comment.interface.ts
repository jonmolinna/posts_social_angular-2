import { userInterface } from './user.interface';

export interface commentInterface {
  comment: string;
  createdAt: Date;
  user: userInterface;
  _id: string;
}
