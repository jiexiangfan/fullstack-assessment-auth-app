import { Router } from "express";
import { userRepo } from "../../db/inMemoryUserRepo";
import { requireAuth, AuthedRequest } from "../../middleware/auth";
import { fail, ok } from "../../lib/respond";

const router = Router();

router.get("/", requireAuth, (req: AuthedRequest, res) => {
  const user = userRepo.findById(req.userId!);
  if (!user) return fail(res, 404, "NOT_FOUND", "User not found");

  return ok(res, { id: user.id, email: user.email, createdAt: user.createdAt });
});

export const meRoutes = router;
