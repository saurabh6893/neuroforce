import api from "./client";

export const getEmployees = () => api.get("/employees");
