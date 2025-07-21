import api from "./api";

export async function createUser(data: {
  nome: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/users", data);
  return response.data;
}

export async function login(data: { email: string; password: string }) {
  const response = await api.post("/auth/login", data);
  const { token } = response.data;
  localStorage.setItem("token", token);
  return { token };
}

export function removeToken() {
  localStorage.removeItem("token");
}
