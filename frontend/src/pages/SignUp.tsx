import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSignup } from "../api/auth";
import { useAuth } from "../auth/useAuth";

export function SignUp() {
  const nav = useNavigate();
  const { setSession } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await apiSignup(email, password);
      setSession(res.token);
      nav("/profile");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign up failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              marginBottom: 12,
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>

        <label>
          Password (min 8 chars)
          <input
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              marginBottom: 12,
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            minLength={8}
            required
          />
        </label>

        {error && (
          <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>
        )}

        <button disabled={submitting} type="submit">
          {submitting ? "Creating..." : "Create account"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
}
