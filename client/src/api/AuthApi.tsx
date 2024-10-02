import { loginData, registerData } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
    credentials: "include",
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const registerUserApi = async (data: registerData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const loginUserApi = async (data: loginData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const logoutUserApi = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};
