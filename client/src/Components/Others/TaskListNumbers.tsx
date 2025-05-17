import { useMemo, useEffect, useState } from "react";
import { Employee, EmployeeDashboardProps } from "../../types";
import { getStatusColor } from "../../utils/Statuses";
import { getLocalStorage } from "../../utils/localStorage";
import ErrorBoundary from "../Common/ErrorBoundary";

type TaskStatus = "newTask" | "completed" | "active" | "failed";

interface StatusCard {
  key: TaskStatus;
  label: string;
  count: number;
}

const TaskListNumbers = ({ data }: EmployeeDashboardProps) => {
  const [localData, setLocalData] = useState<Employee>(() => {
    const { empData } = getLocalStorage();
    return empData.find((emp: any) => emp.id === data?.id) || data;
  });

  useEffect(() => {
    const { empData } = getLocalStorage();
    const currentEmployee = empData.find((emp: any) => emp.id === data?.id);
    if (currentEmployee) setLocalData(currentEmployee);

    const interval = setInterval(() => {
      const { empData } = getLocalStorage();
      const currentEmployee = empData.find((emp: any) => emp.id === data?.id);

      if (
        currentEmployee &&
        JSON.stringify(currentEmployee.tasks) !==
          JSON.stringify(localData?.tasks)
      ) {
        setLocalData(currentEmployee);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [data?.id]);

  if (!localData || !("tasks" in localData)) {
    return null;
  }

  const counts = useMemo(
    () => ({
      newTask: localData.tasks.filter((t) => t.newTask).length,
      completed: localData.tasks.filter((t) => t.completed).length,
      active: localData.tasks.filter((t) => t.active).length,
      failed: localData.tasks.filter((t) => t.failed).length,
    }),
    [localData.tasks]
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
