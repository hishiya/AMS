import http from "./http";

export type User = {
  id: number;
  email: string;
};

type AuthResponse = {
  user: User;
};

export async function login(email: string, password: string): Promise<User> {
  const response = await http.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data.user;
}

export async function register(email: string, password: string): Promise<User> {
  const response = await http.post<AuthResponse>("/auth/register", {
    email,
    password,
  });
  return response.data.user;
}

export async function logout(): Promise<void> {
  await http.post("/auth/logout");
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await http.get<AuthResponse>("/auth/me");
    return response.data.user;
  } catch {
    return null;
  }
}
