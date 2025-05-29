import { Task } from "../../types";
import { getStatusColor } from "../../utils/Statuses";
import ErrorBoundary from "../Common/ErrorBoundary";
import { useMemo } from "react";

type TaskStatus = "newTask" | "completed" | "active" | "failed";
type StatusCard = { key: TaskStatus; label: string; count: number };
type TaskListNumbersProps = { tasks: Task[] };

const TaskListNumbers = ({ tasks }: TaskListNumbersProps) => {
  const counts = useMemo(
    () => ({
      newTask: tasks.filter((t) => t.newTask).length,
      completed: tasks.filter((t) => t.completed).length,
      active: tasks.filter((t) => t.active).length,
      failed: tasks.filter((t) => t.failed).length,
    }),
    [tasks]
  );

  const statusCards: StatusCard[] = [
    { key: "newTask", label: "New Task", count: counts.newTask },
    { key: "completed", label: "Completed", count: counts.completed },
    { key: "active", label: "Active", count: counts.active },
    { key: "failed", label: "Failed", count: counts.failed },
  ];

  return (
    <ErrorBoundary fallback={<div>Stats unavailable!</div>}>
      <div className="grid grid-cols-2 gap-4 p-4">
        {statusCards.map(({ key, label, count }) => (
          <div
            key={key}
            className={`py-6 px-6 rounded-xl ${getStatusColor(
              key
            )} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
            <h2 className="text-4xl font-bold">{count}</h2>
            <h3 className="text-lg font-medium opacity-90">{label}</h3>
          </div>
        ))}
      </div>
    </ErrorBoundary>
  );
};

export default TaskListNumbers;
