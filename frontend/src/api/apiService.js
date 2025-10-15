// src/api/apiService.js
import axios from "axios";

const BASE_URL = "https://your-backend-url.onrender.com";

export const ApiService = {
  login: async (email, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post(`${BASE_URL}/token`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return null;
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      return response.status === 200;
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      return false;
    }
  },
};
