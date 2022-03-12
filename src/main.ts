#!/usr/bin/env node
import "source-map-support/register";
import "dotenv/config.js";

import Twitter from "twitter-api-v2";

const main = async () => {
  // const args = process.argv.slice(2);

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

  let authorIDList: string[] = [];

  const tweets = await readOnlyClient.v2.search("JavaScript", {
    expansions: ["author_id"],
    max_results: 100,
  });
  if (tweets.data.meta.result_count === 0) {
    console.log("no user found");
  } else {
    authorIDList = authorIDList.concat(
      tweets.data.data
        .map((data) => data.author_id)
        .flatMap((data) => (data === undefined ? [] : [data]))
    );
    const users = await client.v2.users(authorIDList);

    console.log(users.data.map((data) => data.username));
  }
};

main();
