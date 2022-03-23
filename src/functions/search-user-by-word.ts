import { Result, Failure, Success } from "../types/result";
import {
  IGetTweetListByWord,
  IGetUserListByUserIDList,
  User,
  ErrorList,
} from "../types/twitter-api";

type Props = {
  word: string;
};
type Dependencies = {
  getTweetListByWord: IGetTweetListByWord;
  getUserListByUserIDList: IGetUserListByUserIDList;
};

export const searchUserByWord = async (
  { word }: Props,
  { getTweetListByWord, getUserListByUserIDList }: Dependencies
): Promise<Result<User[], ErrorList>> => {
  const getTweetListByWordResult = await getTweetListByWord(word);

  if (getTweetListByWordResult.isFailure()) {
    return new Failure(getTweetListByWordResult.value);
  }

  const tweetList = getTweetListByWordResult.value;
  const userIDList = tweetList.flatMap((tweet) =>
    tweet.userID ? [tweet.userID] : []
  );
  const getUserListByUserIDListResult = await getUserListByUserIDList(
    userIDList
  );

  if (getUserListByUserIDListResult.isFailure()) {
    return new Failure(getUserListByUserIDListResult.value);
  }

  const userList = getUserListByUserIDListResult.value;

  return new Success(userList);
};
