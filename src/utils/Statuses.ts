export const statusColor = {
  newTask: "bg-gradient-to-br from-blue-400 to-blue-500 ",
  completed: "bg-gradient-to-br from-green-400 to-green-500 text-black",
  active: "bg-gradient-to-br from-yellow-400 to-yellow-500 text-black",
  failed: "bg-gradient-to-br from-red-400 to-red-500",
} as const;

export type StatusKey = keyof typeof statusColor;

export function getStatusColor(status: StatusKey) {
  return statusColor[status];
}
