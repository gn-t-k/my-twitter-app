#!/usr/bin/env node
import "source-map-support/register";
import "dotenv/config.js";

import Twitter from "twitter-api-v2";
import { searchUserByWord } from "./functions/search-user-by-word";
import {
  getTweetListByWord,
  getUserListByUserIDList,
} from "./apis/twitter-api";
import { Result } from "./types/result";

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

const logResult = async (
  promiseResult: Promise<Result<unknown, unknown>>
): Promise<void> => {
  const result = await promiseResult;

  console.log(result.value);
};

const getFollowers = async (userID: string) => {
  const user = await readOnlyClient.v2.userByUsername(userID);

  if (user.errors) {
    console.log(user.errors);
  } else {
    const followers = await readOnlyClient.v2.followers(user.data.id);

    if (followers.errors) {
      console.log(followers.errors);
    } else {
      console.log(followers.data);
    }
  }
};

const main = async () => {
  const args = process.argv.slice(2);

  switch (args[0]) {
    case "users":
      logResult(
        searchUserByWord(
          { word: args[1] },
          { getTweetListByWord, getUserListByUserIDList }
        )
      );
      break;
    case "followers":
      await getFollowers(args[1]);
      break;
    default:
      console.log("invalid command");
      break;
  }
};

main();
