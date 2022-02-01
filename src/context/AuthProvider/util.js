import { Api } from "../../services/api";

export function setUserLocalStorage(user) {
  localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("u")

  if (!json) {
    return null;
  }

  const user = JSON.parse(json)

  return user ?? null;
}

export async function RegisterRequest(name, email, password) {
  try {
    const request = await Api.post('auth-professional/register', { name, email, password });

    return request.data
  } catch (error) {
    return null;
  }
}

export async function LoginRequest(email, password) {
  try {
    const request = await Api.post('auth-professional/authenticate', { email, password });

    return request.data
  } catch (error) {
    return null;
  }
}