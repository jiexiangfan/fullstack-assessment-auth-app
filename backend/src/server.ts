import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { authRoutes } from "./modules/auth/auth.routes";
import { meRoutes } from "./modules/me/me.routes";
import { ok } from "./lib/respond";

const app = express();

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (_req, res) => ok(res, { ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);

app.listen(env.port, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://0.0.0.0:${env.port}`);
});
