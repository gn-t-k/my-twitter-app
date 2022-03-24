import Twitter from "twitter-api-v2";
import { Failure, Success } from "../types/result";
import {
  IGetFollowerByUserID,
  IGetTweetListByWord,
  IGetUserByUserName,
  IGetUserListByUserIDList,
} from "../types/twitter-api";

const appKey = process.env.API_KEY ?? "";
const appSecret = process.env.API_KEY_SECRET ?? "";
const accessToken = process.env.ACCESS_TOKEN ?? "";
const accessSecret = process.env.ACCESS_TOKEN_SECRET ?? "";

const client = new Twitter({
  appKey,
  appSecret,
  accessToken,
  accessSecret,
});
const readOnlyClient = client.readOnly;

export const getTweetListByWord: IGetTweetListByWord = async (word) => {
  const tweetList = await readOnlyClient.v2.search(word, {
    expansions: ["author_id"],
  });

  return tweetList.data.errors === undefined ||
    tweetList.data.errors.length === 0
    ? new Success(
        tweetList.data.data.map((tweet) => ({
          id: tweet.id,
          text: tweet.text,
          createdAt: tweet.created_at,
          userID: tweet.author_id,
        }))
      )
    : new Failure(
        tweetList.data.errors?.map((error) => error.detail) ?? ["unknown error"]
      );
};

export const getUserListByUserIDList: IGetUserListByUserIDList = async (
  userIDList
) => {
  const userList = await readOnlyClient.v2.users(userIDList);

  return userList.errors === undefined || userList.errors.length === 0
    ? new Success(
        userList.data.map((user) => ({
          id: user.id,
          userName: user.username,
          name: user.name,
          description: user.description,
        }))
      )
    : new Failure(
        userList.errors?.map((error) => error.detail) ?? ["unknown error"]
      );
};

export const getUserByUserName: IGetUserByUserName = async (userName) => {
  const user = await readOnlyClient.v2.userByUsername(userName);

  return user.errors === undefined || user.errors?.length === 0
    ? new Success({
        id: user.data.id,
        userName,
        name: user.data.name,
        description: user.data.description,
      })
    : new Failure(
        user.errors?.map((error) => error.detail) ?? ["unknown error"]
      );
};

export const getFollowerByUserID: IGetFollowerByUserID = async (userID) => {
  const follower = await readOnlyClient.v2.followers(userID);

  return follower.errors === undefined || follower.errors.length === 0
    ? new Success({
        followeeUserID: userID,
        userList: follower.data.map((user) => ({
          id: user.id,
          userName: user.username,
          name: user.name,
          description: user.description,
        })),
      })
    : new Failure(follower.errors.map((error) => error.detail));
};
