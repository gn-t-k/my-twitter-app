import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/?(*.)spec.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
export default config;
