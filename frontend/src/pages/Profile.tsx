import { useAuth } from "../auth/useAuth";
import { apiSignout } from "../api/auth";

export function Profile() {
  const { user, token, clearSession, refreshMe } = useAuth();

  async function onLogout() {
    try {
      await apiSignout();
    } finally {
      clearSession();
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: 16 }}>
      <h1>Profile</h1>

      {!user ? (
        <div>
          <p>Loading user...</p>
          <button onClick={() => void refreshMe()} disabled={!token}>
            Retry
          </button>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
          <div>
            <b>ID:</b> {user.id}
          </div>
          <div>
            <b>Email:</b> {user.email}
          </div>
          <div>
            <b>Created:</b> {new Date(user.createdAt).toLocaleString()}
          </div>
        </div>
      )}

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={onLogout}>Logout</button>
        <button onClick={() => void refreshMe()} disabled={!token}>
          Refresh
        </button>
      </div>
    </div>
  );
}
