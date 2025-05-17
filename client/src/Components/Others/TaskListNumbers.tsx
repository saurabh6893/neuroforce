import { useMemo } from "react";
import { Task } from "../../types";
import ErrorBoundary from "../Common/ErrorBoundary";

interface TaskListNumbersProps {
  tasks: Task[];
}

const TaskListNumbers = ({ tasks }: TaskListNumbersProps) => {
  const counts = useMemo(
    () => ({
      newTask: tasks.filter((t) => t.newTask).length,
      active: tasks.filter((t) => t.active).length,
      completed: tasks.filter((t) => t.completed).length,
      failed: tasks.filter((t) => t.failed).length,
    }),
    [tasks]
  );

  const statusCards = [
    { key: "newTask", label: "New Task", count: counts.newTask },
    { key: "active", label: "Active", count: counts.active },
    { key: "completed", label: "Completed", count: counts.completed },
    { key: "failed", label: "Failed", count: counts.failed },
  ];

  const getStatusColor = (key: string) => {
    switch (key) {
      case "newTask":
        return "bg-gradient-to-r from-[#6366f1] to-[#a855f7]";
      case "active":
        return "bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]";
      case "completed":
        return "bg-gradient-to-r from-[#22c55e] to-[#15803d]";
      case "failed":
        return "bg-gradient-to-r from-[#ef4444] to-[#b91c1c]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <ErrorBoundary fallback={<div>Stats unavailable!</div>}>
      <div className="grid grid-cols-2 gap-4 p-4">
        {tasks.length > 0 ? (
          statusCards.map(({ key, label, count }) => (
            <div
              key={key}
              className={`py-6 px-6 rounded-xl ${getStatusColor(
                key
              )} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
              <h2 className="text-4xl font-bold">{count}</h2>
              <h3 className="text-lg font-medium opacity-90">{label}</h3>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-2">
            No tasks available
          </p>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default TaskListNumbers;
