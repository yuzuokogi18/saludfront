import axios from "axios";

export const caseApi = axios.create({
  baseURL: "http://100.28.173.85:8080/cases",
  headers: {
    "Content-Type": "application/json",
  },
});
