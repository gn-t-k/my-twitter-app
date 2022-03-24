import { Failure, Result, Success } from "../types/result";
import {
  Follower,
  ErrorList,
  IGetFollowerByUserID,
  IGetUserByUserName,
} from "../types/twitter-api";

type Props = {
  userName: string;
};
type Dependencies = {
  getUserByUserName: IGetUserByUserName;
  getFollowerByUserID: IGetFollowerByUserID;
};

export const getFollowerByUserName = async (
  { userName }: Props,
  { getUserByUserName, getFollowerByUserID }: Dependencies
): Promise<Result<Follower, ErrorList>> => {
  const getUserByUserNameResult = await getUserByUserName(userName);

  if (getUserByUserNameResult.isFailure()) {
    return new Failure(getUserByUserNameResult.value);
  }

  const user = getUserByUserNameResult.value;
  const userID = user.id;

  const getFollowerByUserIDResult = await getFollowerByUserID(userID);

  if (getFollowerByUserIDResult.isFailure()) {
    return new Failure(getFollowerByUserIDResult.value);
  }

  const follower = getFollowerByUserIDResult.value;

  return new Success(follower);
};
