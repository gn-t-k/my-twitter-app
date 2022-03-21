#!/usr/bin/env node
import "source-map-support/register";
import "dotenv/config.js";

import Twitter from "twitter-api-v2";

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

const searchUserByWord = async (word: string) => {
  const tweets = await readOnlyClient.v2.search(word, {
    expansions: ["author_id"],
    max_results: 100,
  });
  if (tweets.data.meta.result_count === 0) {
    console.log("user not found");
  } else {
    const authorIDList = tweets.data.data
      .map((data) => data.author_id)
      .flatMap((data) => (data === undefined ? [] : [data]));
    const users = await client.v2.users(authorIDList);

    console.log(users.data.map((data) => data.username));
  }
};

const getFollowers = async (userID: string) => {
  const user = await readOnlyClient.v2.userByUsername(userID);
  const followers = await readOnlyClient.v2.followers(user.data.id);

  console.log(followers);
};

const main = async () => {
  const args = process.argv.slice(2);

  switch (args[0]) {
    case "users":
      await searchUserByWord(args[1]);
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
