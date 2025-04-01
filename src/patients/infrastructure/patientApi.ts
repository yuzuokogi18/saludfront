import axios from "axios";

export const patientApi = axios.create({
  baseURL: "http://localhost:8080/patients",
  headers: {
    "Content-Type": "application/json",
  },
});
