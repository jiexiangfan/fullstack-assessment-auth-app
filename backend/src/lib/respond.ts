import { Response } from "express";

export function ok<T>(res: Response, body: T, status = 200) {
  return res.status(status).json(body);
}

export function fail(
  res: Response,
  status: number,
  code: string,
  message: string
) {
  return res.status(status).json({ error: { code, message } });
}
