import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:8080",
});

export default axiosInstance;
