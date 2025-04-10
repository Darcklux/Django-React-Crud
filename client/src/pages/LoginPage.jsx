import React, { useState } from "react";
import { loginUser, getCurrentUser } from "../api/auth.api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access } = await loginUser(username, password);
      console.log("Token de acceso recibido:", access);

      localStorage.setItem("accessToken", access);

      const currentUser = await getCurrentUser(access);
      console.log("Usuario actual:", currentUser);

      setUser(currentUser);
    } catch (err) {
      console.error("Error durante el login o al obtener usuario:", err);
      setError("Error durante el login");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.mail}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
