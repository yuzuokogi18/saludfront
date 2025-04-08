import axios from "axios";

export const userApi = axios.create({
  baseURL: "http://54.175.13.23:8080/users", 
  headers: {
    "Content-Type": "application/json",
  },
});
