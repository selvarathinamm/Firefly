// src/api/apiService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ApiService = {
  login: async (email, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post(`${BASE_URL}/login`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      return response.data; // contains access_token
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return null;
    }
  },
};