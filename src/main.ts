#!/usr/bin/env node
import "source-map-support/register";
import "dotenv/config.js";
import { searchUserByWord } from "./functions/search-user-by-word";
import {
  getTweetListByWord,
  getUserListByUserIDList,
  getUserByUserName,
  getFollowerByUserID,
} from "./apis/twitter-api";
import { getFollowerByUserName } from "./functions/get-follower-by-user-name";
import { logResult } from "./functions/log-result";

const main = async () => {
  const [command, arg] = process.argv.slice(2);

  switch (command) {
    case "users":
      logResult(
        searchUserByWord(
          { word: arg },
          { getTweetListByWord, getUserListByUserIDList }
        )
      );
      break;
    case "followers":
      logResult(
        getFollowerByUserName(
          { userName: arg },
          { getUserByUserName, getFollowerByUserID }
        )
      );
      break;
    default:
      console.log("invalid command");
      break;
  }
};

main();
