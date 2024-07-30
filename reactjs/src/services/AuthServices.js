import axios from "axios";

const API_URL = "/api/v1/auth";

const signup = (email, password, firstName, lastName, age, country) => {
  return axios
    .post(`${API_URL}/signup`, {
      email,
      password,
      firstName,
      lastName,
      age,
      country,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(`${API_URL}/signin`, { email, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  signup,
  login,
  logout,
  getCurrentUser,
};
