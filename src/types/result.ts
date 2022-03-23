export type Result<T, E> = Success<T, E> | Failure<T, E>;

export class Success<T, E> {
  public constructor(public readonly value: T) {}

  public isSuccess(): this is Success<T, E> {
    return true;
  }

  public isFailure(): this is Failure<T, E> {
    return false;
  }
}

export class Failure<T, E> {
  public constructor(public readonly value: E) {}

  public isSuccess(): this is Success<T, E> {
    return false;
  }

  public isFailure(): this is Failure<T, E> {
    return true;
  }
}
