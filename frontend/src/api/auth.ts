import { requestJson } from "./http";
import type { AuthResponse } from "./types";

export function apiSignup(email: string, password: string) {
  return requestJson<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function apiSignin(email: string, password: string) {
  return requestJson<AuthResponse>("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function apiSignout() {
  return requestJson<{ ok: boolean }>("/api/auth/signout", { method: "POST" });
}
