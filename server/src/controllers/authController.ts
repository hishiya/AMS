import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db";

const COOKIE_NAME = "access_token";

function getCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: (isProd ? "none" : "lax") as "lax" | "none",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  };
}

function signToken(userId: number, email: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const rawExpiresIn = process.env.JWT_EXPIRES_IN;
  const expiresIn: jwt.SignOptions["expiresIn"] =
    rawExpiresIn && /^\d+$/.test(rawExpiresIn)
      ? Number(rawExpiresIn)
      : ((rawExpiresIn ?? "1d") as jwt.SignOptions["expiresIn"]);
  return jwt.sign({ sub: userId, email }, secret, {
    expiresIn,
  });
}

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password || password.length < 6) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const exists = await pool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);
  if (exists.rows.length > 0) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const created = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
    [email, passwordHash],
  );

  const user = created.rows[0];
  const token = signToken(user.id, user.email);
  res.cookie(COOKIE_NAME, token, getCookieOptions());
  return res.status(201).json({ user });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const result = await pool.query(
    "SELECT id, email, password_hash FROM users WHERE email = $1",
    [email],
  );
  if (result.rows.length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user = result.rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user.id, user.email);
  res.cookie(COOKIE_NAME, token, getCookieOptions());
  return res.json({ user: { id: user.id, email: user.email } });
}

export function logout(_req: Request, res: Response) {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProd,
    sameSite: (isProd ? "none" : "lax") as "lax" | "none",
    path: "/",
  });
  return res.json({ message: "Logged out" });
}

export function me(req: Request, res: Response) {
  return res.json({ user: (req as any).user ?? null });
}
