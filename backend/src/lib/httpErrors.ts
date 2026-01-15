export class HttpError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}

export function isHttpError(e: unknown): e is HttpError {
  return e instanceof HttpError;
}
