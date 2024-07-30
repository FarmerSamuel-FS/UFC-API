import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/v1/auth/"
    : process.env.REACT_APP_BASE_URL + "/auth/";

const signup = (email, password, firstName, lastName, age, country) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    firstName,
    lastName,
    age,
    country,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
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

const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
