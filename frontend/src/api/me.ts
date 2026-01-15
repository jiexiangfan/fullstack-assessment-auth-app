import { requestJson } from "./http";
import type { User } from "./types";

export function apiMe(token: string) {
  return requestJson<User>("/api/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}
