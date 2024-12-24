export interface userInterface {
  _id: string;
  name: string;
  username: string;
  createdAt: Date;
}

export interface userInputInterface
  extends Omit<userInterface, '_id' | 'createdAt'> {
  password: string;
}

export interface authInputInterface extends Omit<userInputInterface, 'name'> {}

export interface authResponse {
  token: string;
}
