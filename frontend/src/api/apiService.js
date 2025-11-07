// ===============================
// 🔥 VVFirefly API Service Layer
// ===============================

const API_BASE = "http://localhost:8080/api"; // backend base URL

// === 1️⃣ LOGIN (JWT Auth) ===
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return await response.json(); // expects { access_token: "..." }
};

// === 2️⃣ LOGOUT ===
export const logout = () => {
  localStorage.removeItem("token");
};

// === 3️⃣ GET helper for any secure endpoint ===
export const get = async (endpoint) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("Unauthorized - please log in again");
  }

  return await response.json();
};

// === 4️⃣ POST helper ===
export const post = async (endpoint, data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return await response.json();
};
