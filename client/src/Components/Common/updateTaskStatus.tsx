import { Task } from "../../types";

export async function updateTaskStatus(
  taskId: string,
  newStatus: Partial<Task>
): Promise<any> {
  return fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStatus),
    credentials: "include",
  }).then((res) => res.json());
}
