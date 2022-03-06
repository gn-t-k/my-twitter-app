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

  const foundUsers = await client.v1.searchUsers("test");

  console.log({ foundUsers });
};

main();
