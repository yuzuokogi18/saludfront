import axios from "axios";

export const patientApi = axios.create({
  baseURL: "http://54.175.13.23:8080/patients",
  headers: {
    "Content-Type": "application/json",
  },
});
