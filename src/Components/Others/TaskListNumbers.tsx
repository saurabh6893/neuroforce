import { useMemo } from "react";
import { EmployeeDashboardProps } from "../../types";
import { getStatusColor } from "../../utils/Statuses";

type TaskStatus = "newTask" | "completed" | "active" | "failed";

interface StatusCard {
  key: TaskStatus;
  label: string;
  count: number;
}

const TaskListNumbers = ({ data }: EmployeeDashboardProps) => {
  if (!data || !("tasks" in data)) {
    return null;
  }

  const counts = useMemo(() => {
    return {
      newTask: data.tasks.filter((task) => task.newTask).length,
      completed: data.tasks.filter((task) => task.completed).length,
      active: data.tasks.filter((task) => task.active).length,
      failed: data.tasks.filter((task) => task.failed).length,
    };
  }, [data.tasks]);

  const statusCards: StatusCard[] = [
    { key: "newTask", label: "New Task", count: counts.newTask },
    { key: "completed", label: "Completed", count: counts.completed },
    { key: "active", label: "Active", count: counts.active },
    { key: "failed", label: "Failed", count: counts.failed },
  ];

  return (
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
  );
};

export default TaskListNumbers;
