type UserID = string;

type Tweet = {
  id: string;
  text: string;
  createdAt: string;
  userID: UserID;
};

type User = {
  id: string;
  userID: UserID;
  name: string;
  description: string;
};

type Follower = {
  followeeUserID: UserID;
  userList: User[];
};

export type IGetTweetListByWord = (word: string) => Tweet;

export type IGetUserListByUserIDList = (userIDList: UserID[]) => User[];

export type IGetUserByUserID = (userID: UserID) => User;

export type IGetFollowerByUserID = (userID: UserID) => Follower;
