#!/usr/bin/env node
import "source-map-support/register";

const main = () => {
  const args = process.argv.slice(2);

  console.log(args);
};

main();
