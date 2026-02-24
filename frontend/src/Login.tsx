import { useState } from "react";

type Role = "admin" | "user";

type Props = {
  onLogin: (role: Role) => void;
};

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const handleLogin = () => {
    setErr(null);

    // conturi demo (frontend only)
    const accounts = [
      { username: "admin", password: "admin123", role: "admin" as const },
      { username: "user", password: "user123", role: "user" as const },
    ];

    const found = accounts.find(
      (a) => a.username === username.trim() && a.password === password
    );

    if (!found) {
      setErr("Date incorecte. Încearcă admin/admin123 sau user/user123.");
      return;
    }

    localStorage.setItem("role", found.role);
    localStorage.setItem("username", found.username);

    onLogin(found.role);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f6f7fb",
        fontFamily: "Arial, sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: 18,
          padding: 28,
          boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 8 }}>Autentificare</h2>
        <p style={{ marginTop: 0, color: "#666", marginBottom: 20 }}>
          Intră ca <b>admin</b> sau <b>user</b>.
        </p>

        <label style={{ fontWeight: 700, color: "#333" }}>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin / user"
          style={{
            width: "100%",
            marginTop: 6,
            marginBottom: 14,
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #ddd",
            outline: "none",
          }}
        />

        <label style={{ fontWeight: 700, color: "#333" }}>Parolă</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="admin123 / user123"
          style={{
            width: "100%",
            marginTop: 6,
            marginBottom: 14,
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #ddd",
            outline: "none",
          }}
        />

        {err && (
          <div
            style={{
              background: "#fff2f2",
              border: "1px solid #ffd1d1",
              color: "#b00020",
              padding: 10,
              borderRadius: 12,
              marginBottom: 14,
              fontSize: 13,
            }}
          >
            {err}
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            backgroundColor: "#ff4d29",
            color: "#fff",
            border: "none",
            padding: "12px 16px",
            borderRadius: 14,
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 15,
          }}
        >
          Login
        </button>

        <div style={{ marginTop: 14, color: "#777", fontSize: 13 }}>
          Conturi demo:
          <div>
            <b>admin</b> / <b>admin123</b>
          </div>
          <div>
            <b>user</b> / <b>user123</b>
          </div>
        </div>
      </div>
    </div>
  );
}