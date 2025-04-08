import axios from "axios";

export const caseApi = axios.create({
  baseURL: "http://54.175.13.23:8080/cases",
  headers: {
    "Content-Type": "application/json",
  },
});
