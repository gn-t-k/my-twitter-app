import Twitter from "twitter-api-v2";
import { Failure, Success } from "../types/result";
import {
  IGetTweetListByWord,
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
          userID: user.username,
          name: user.name,
          description: user.description,
        }))
      )
    : new Failure(
        userList.errors?.map((error) => error.detail) ?? ["unknown error"]
      );
};
