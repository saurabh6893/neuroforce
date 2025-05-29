import api from "./client";

export const createTask = (task: any) => api.post("/tasks", task); // admin
export const getAllTasks = () => api.get("/tasks");
export const getMyTasks = () => api.get("/tasks/my");
export const updateTask = (id: string, updates: any) =>
  api.patch(`/tasks/${id}`, updates);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`); // admin
