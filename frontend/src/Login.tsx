import { useState } from "react";

type Props = {
  onLogin: (role: "admin" | "user") => void;
};

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("role", "admin");
      onLogin("admin");
    } else if (username === "user" && password === "user123") {
      localStorage.setItem("role", "user");
      onLogin("user");
    } else {
      alert("Date incorecte!");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p>Admin: admin / admin123</p>
      <p>User: user / user123</p>
    </div>
  );
}