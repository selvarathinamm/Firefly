// src/api/apiService.js
import axios from "axios";

const BASE_URL = "https://your-backend-url.onrender.com"; // same as Flutter

export const ApiService = {
  // LOGIN
  login: async (email, password, role) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);
      formData.append("scope", role);

      const response = await axios.post(`${BASE_URL}/token`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return null;
    }
  },

  // REGISTER
  register: async (name, email, password, role) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        { name, email, password, role },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.status === 200;
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      return false;
    }
  },
};
