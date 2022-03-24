import { Result } from "./result";

type UserID = string;
type UserName = string;

export type User = {
  id: string;
  userName: UserName;
  name: string;
  description?: string;
};

type Tweet = {
  id: string;
  text: string;
  createdAt?: string;
  userID?: UserID;
};

export type Follower = {
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

export type IGetUserByUserName = (
  userName: UserName
) => Promise<Result<User, ErrorList>>;

export type IGetFollowerByUserID = (
  userID: UserID
) => Promise<Result<Follower, ErrorList>>;
