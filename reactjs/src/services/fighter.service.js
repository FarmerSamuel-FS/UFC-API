import axios from "axios";
import authHeader from "./authHeader";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/v1"
    : process.env.REACT_APP_BASE_URL;

const API_URL = "/fighters";

const getAllPrivateFighters = () => {
  return axios.get(`${API_BASE}${API_URL}`, { headers: authHeader() });
};

const fightersService = {
  getAllPrivateFighters,
};

export default fightersService;
