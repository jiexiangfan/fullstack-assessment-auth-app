import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { fail } from "../lib/respond";

export type AuthedRequest = Request & { userId?: string };

export function requireAuth(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.header("Authorization");
  if (!header?.startsWith("Bearer "))
    return fail(res, 401, "UNAUTHORISED", "Missing bearer token");

  const token = header.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, env.jwtSecret) as { sub: string };
    req.userId = payload.sub;
    return next();
  } catch {
    return fail(res, 401, "UNAUTHORISED", "Invalid or expired token");
  }
}
