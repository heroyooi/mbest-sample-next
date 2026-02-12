"use client";

import { useState } from "react";
import { loginApi, meApi, signupApi } from "@/api/authApi";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = mode === "signup" ? { name, email, password } : { email, password };
      const response = mode === "signup" ? await signupApi(payload) : await loginApi(payload);
      setToken(response.data.token);
      setUser(response.data.user);
      setMessage(mode === "signup" ? "Sign up success" : "Login success");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMe = async () => {
    if (!token) {
      setMessage("No token. Please login first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await meApi(token);
      setUser(response.data.user);
      setMessage("Fetched current user");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <div className="row between">
        <h2>Auth Demo</h2>
        <div className="row">
          <button type="button" onClick={() => setMode("signup")}>
            Sign up
          </button>
          <button type="button" onClick={() => setMode("login")}>
            Login
          </button>
        </div>
      </div>

      <form onSubmit={submit}>
        {mode === "signup" ? (
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
            />
          </div>
        ) : null}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="demo@sample.com"
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="1234"
          />
        </div>

        <div className="row">
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : mode === "signup" ? "Sign up" : "Login"}
          </button>
          <button type="button" onClick={fetchMe} disabled={loading || !token}>
            /auth/me
          </button>
        </div>
      </form>

      {message ? <p className="meta">{message}</p> : null}

      {user ? (
        <div className="card">
          <h3>Current User</h3>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p className="meta">Token: {token}</p>
        </div>
      ) : null}
    </section>
  );
}
