import axios from "axios";

export const caseApi = axios.create({
  baseURL: "https://api.tuservidor.com",
  headers: {
    "Content-Type": "application/json",
  },
});
