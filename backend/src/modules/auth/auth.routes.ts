import { Router } from "express";
import { z } from "zod";
import { fail, ok } from "../../lib/respond";
import { isHttpError } from "../../lib/httpErrors";
import { signin, signup } from "./auth.service";

const router = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success)
    return fail(
      res,
      400,
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ?? "Invalid input"
    );

  try {
    const result = await signup(parsed.data.email, parsed.data.password);
    return ok(res, result, 201);
  } catch (e) {
    if (isHttpError(e)) return fail(res, e.status, e.code, e.message);
    return fail(res, 500, "INTERNAL_ERROR", "Unexpected error");
  }
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(72),
});

router.post("/signin", async (req, res) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success)
    return fail(
      res,
      400,
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ?? "Invalid input"
    );

  try {
    const result = await signin(parsed.data.email, parsed.data.password);
    return ok(res, result, 200);
  } catch (e) {
    if (isHttpError(e)) return fail(res, e.status, e.code, e.message);
    return fail(res, 500, "INTERNAL_ERROR", "Unexpected error");
  }
});

router.post("/signout", async (_req, res) => {
  return ok(res, { ok: true });
});

export const authRoutes = router;
