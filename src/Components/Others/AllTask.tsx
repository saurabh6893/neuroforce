import { useEffect, useState } from "react";
import { Employee, Task } from "../../types";
import { getStatusColor, StatusKey } from "../../utils/Statuses";

const AllTask = ({
  sortType,
}: {
  sortType: "name" | "statusAsc" | "statusDesc";
}) => {
  const [tasks, setTasks] = useState<{ employeeName: string; task: Task }[]>(
    []
  );

  useEffect(() => {
    const empData: Employee[] = JSON.parse(
      localStorage.getItem("Employee") || "[]"
    );

    const allTasks = empData.flatMap((emp) =>
      emp.tasks.map((task) => ({
        employeeName: emp.firstName,
        task,
      }))
    );

    setTasks(allTasks);
  }, []);

  const getTaskStatusKey = (task: Task): StatusKey => {
    if (task.completed) return "completed";
    if (task.active) return "active";
    if (task.newTask) return "newTask";
    if (task.failed) return "failed";
    return "newTask";
  };

  const statusOrderAsc: StatusKey[] = [
    "failed",
    "newTask",
    "active",
    "completed",
  ];

  const statusOrderDesc = [...statusOrderAsc].reverse();

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortType === "name") {
      return a.employeeName.localeCompare(b.employeeName);
    } else {
      const aKey = getTaskStatusKey(a.task);
      const bKey = getTaskStatusKey(b.task);
      const order = sortType === "statusAsc" ? statusOrderAsc : statusOrderDesc;
      return order.indexOf(aKey) - order.indexOf(bKey);
    }
  });

  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-10 mb-4 h-3/4 overflow-auto text-white">
      <div className="mt-4">
        {sortedTasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          sortedTasks.map(({ employeeName, task }, index) => {
            const statusKey = getTaskStatusKey(task);
            const bgClass = getStatusColor(statusKey);

            return (
              <div
                key={index}
                className={`${bgClass} mb-4 py-2 px-4 flex flex-col rounded shadow`}>
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-2xl">{employeeName}</h2>
                  <h5 className="text-sm">{task.date}</h5>
                </div>
                <h3 className="text-lg font-medium">{task.title}</h3>
                <p className="text-sm opacity-90">{task.description}</p>
                <div className="text-sm mt-1">
                  Status:{" "}
                  {statusKey === "completed"
                    ? "✅ Completed"
                    : statusKey === "active"
                    ? "🟡 Active"
                    : statusKey === "newTask"
                    ? "🆕 New"
                    : statusKey === "failed"
                    ? "❌ Failed"
                    : "❓ Unknown"}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllTask;
