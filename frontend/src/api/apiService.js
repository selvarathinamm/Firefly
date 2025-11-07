// src/api/apiService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const TOKEN_KEY = "token";

const saveToken = (token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
};
const readToken = () => localStorage.getItem(TOKEN_KEY);
const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const ApiService = {
  // Attempt JSON login first (/api/auth/login). If that fails, try form /token for legacy/mock.
  login: async (email, password) => {
    // 1) Try backend JWT endpoint expecting JSON body
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const token = res.data?.access_token ?? res.data?.token;
      if (token) saveToken(token);
      return res.data;
    } catch (errJson) {
      // 2) Fallback: try form-encoded /token (mock or legacy)
      try {
        const form = new URLSearchParams();
        form.append("username", email);
        form.append("password", password);

        const res2 = await axios.post(`${BASE_URL.replace(/\/api$/, "")}/token`, form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        const token = res2.data?.access_token ?? res2.data?.token;
        if (token) saveToken(token);
        return res2.data;
      } catch (errForm) {
        // normalize error
        const message =
          errForm?.response?.data?.error ||
          errJson?.response?.data?.error ||
          errForm?.response?.statusText ||
          "Login failed";
        throw new Error(message);
      }
    }
  },

  logout: () => {
    removeToken();
  },

  // Generic GET with auth header
  get: async (endpoint) => {
    const token = readToken();
    const res = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.data;
  },

  // Generic POST with auth header
  post: async (endpoint, data) => {
    const token = readToken();
    const res = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.data;
  },

  // Register using JSON /api/auth/register if available, otherwise /register
  register: async (name, email, password) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data;
    } catch (err) {
      // fallback to top-level /register (mock)
      const res2 = await axios.post(
        `${BASE_URL.replace(/\/api$/, "")}/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return res2.data;
    }
  },
};

export default ApiService;