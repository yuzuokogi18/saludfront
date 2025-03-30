import axios from "axios";

export const patientApi = axios.create({
  baseURL: "https://api.tuservidor.com",
  headers: {
    "Content-Type": "application/json",
  },
});
