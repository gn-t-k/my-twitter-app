import { Result } from "./result";

type UserID = string;

export type User = {
  id: string;
  userID: UserID;
  name: string;
  description?: string;
};

type Tweet = {
  id: string;
  text: string;
  createdAt?: string;
  userID?: UserID;
};

type Follower = {
  followeeUserID: UserID;
  userList: User[];
};

export type ErrorList = string[];

export type IGetTweetListByWord = (
  word: string
) => Promise<Result<Tweet[], ErrorList>>;

export type IGetUserListByUserIDList = (
  userIDList: UserID[]
) => Promise<Result<User[], ErrorList>>;

export type IGetUserByUserID = (userID: UserID) => Promise<User>;

export type IGetFollowerByUserID = (userID: UserID) => Promise<Follower>;
