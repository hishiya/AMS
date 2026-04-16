import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/authApi";
import styles from "./LoginPage.module.css";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }

      navigate("/dashboard", { replace: true });
    } catch {
      setError("Authentication failed. Check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        {mode === "login" ? "Login" : "Register"}
      </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          minLength={6}
          required
        />
        <button
          className={`${styles.button} ${styles.primaryButton}`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Please wait..."
            : mode === "login"
              ? "Login"
              : "Create account"}
        </button>
      </form>

      {error ? <p className={styles.error}>{error}</p> : null}

      <p className={styles.hint}>
        {mode === "login" ? "No account yet?" : "Already have an account?"}{" "}
        <button
          className={`${styles.button} ${styles.switchButton}`}
          type="button"
          onClick={() =>
            setMode((prev) => (prev === "login" ? "register" : "login"))
          }
        >
          {mode === "login" ? "Register" : "Go to login"}
        </button>
      </p>
    </section>
  );
};
