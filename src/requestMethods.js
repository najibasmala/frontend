import axios from "axios";

const BASE_URL = "https://elearning-w-api.onrender.com/";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

