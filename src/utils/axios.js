import axiosLib from "axios";
import { getToken } from "../services/TokenService";

const axios = axiosLib.create({
  // baseURL: "http://192.168.8.114:8000/api", //Laptop
  baseURL: "http://192.168.8.125:8000/api", //PC
  headers: {
    Accept: "application/json",
    // Authorization: `Bearer ${data.token}`,
  },
});

axios.interceptors.request.use(async (req) => {
  const token = await getToken();
  if (token !== null) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default axios;
