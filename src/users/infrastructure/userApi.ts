import axios from "axios";

export const userApi = axios.create({
  baseURL: "http://100.28.173.85:8080/users/", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});
