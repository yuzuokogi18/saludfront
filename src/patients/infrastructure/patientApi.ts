import axios from "axios";

export const patientApi = axios.create({
  baseURL: "http://100.28.173.85:8080/patients/",
  headers: {
    "Content-Type": "application/json",
  },
});
