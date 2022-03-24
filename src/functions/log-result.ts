import { Result } from "../types/result";

export const logResult = async (
  promiseResult: Promise<Result<unknown, unknown>>
): Promise<void> => {
  const result = await promiseResult;

  console.log(result.value);
};
