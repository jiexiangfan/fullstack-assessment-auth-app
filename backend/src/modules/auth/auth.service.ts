import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { userRepo } from "../../db/inMemoryUserRepo";
import { HttpError } from "../../lib/httpErrors";

const SALT_ROUNDS = 12;

export async function signup(email: string, password: string) {
  const existing = userRepo.findByEmail(email);
  if (existing)
    throw new HttpError(409, "EMAIL_TAKEN", "Email is already registered.");

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = userRepo.create(email, passwordHash);

  const token = jwt.sign({ sub: user.id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  return {
    user: { id: user.id, email: user.email, createdAt: user.createdAt },
    token,
  };
}

export async function signin(email: string, password: string) {
  const user = userRepo.findByEmail(email);
  if (!user)
    throw new HttpError(
      401,
      "INVALID_CREDENTIALS",
      "Invalid email or password."
    );

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok)
    throw new HttpError(
      401,
      "INVALID_CREDENTIALS",
      "Invalid email or password."
    );

  const token = jwt.sign({ sub: user.id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  return {
    user: { id: user.id, email: user.email, createdAt: user.createdAt },
    token,
  };
}
