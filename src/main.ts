#!/usr/bin/env node
import "source-map-support/register";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const main = () => {
  // eslint-disable-next-line no-unused-expressions
  yargs(hideBin(process.argv))
    .commandDir("commands")
    .strict()
    .alias({ h: "help" }).argv;
};

main();
