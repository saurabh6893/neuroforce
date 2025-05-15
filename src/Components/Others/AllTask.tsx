import { Task } from "../../types";
import { getStatusColor, StatusKey } from "../../utils/Statuses";
import { useEffect, useState, useRef } from "react";
import { getLocalStorage } from "../../utils/localStorage";
import { gsap } from "gsap";
import ErrorBoundary from "../Common/ErrorBoundary";

const AllTask = ({
  sortType,
  tasks: initialTasks,
}: {
  sortType: "name" | "statusAsc" | "statusDesc";
  tasks: { employeeName: string; task: Task }[];
}) => {
  const [tasks, setTasks] = useState(initialTasks);
  const taskCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  useEffect(() => {
    if (taskCardsRef.current.length > 0) {
      gsap.set(taskCardsRef.current, {
        y: 100,
        opacity: 0,
      });

      gsap.to(taskCardsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.1,
      });
    }
  }, [tasks, sortType]);

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

  const handleStatusChange = async (
    employeeName: string,
    task: Task,
    newStatus: string
  ) => {
    if (newStatus === "delete") {
      const { empData } = getLocalStorage();
      const updatedEmpData = empData.map((emp: any) => {
        if (emp.fullName === employeeName) {
          return {
            ...emp,
            tasks: emp.tasks.filter(
              (t: Task) => t.title !== task.title || t.date !== task.date
            ),
          };
        }
        return emp;
      });

      localStorage.setItem("Employee", JSON.stringify(updatedEmpData));
      setTasks((prev) =>
        prev.filter(
          (t) =>
            t.employeeName !== employeeName ||
            t.task.title !== task.title ||
            t.task.date !== task.date
        )
      );
      return;
    }

    const updatedTask = {
      ...task,
      newTask: newStatus === "newTask",
      active: newStatus === "active",
      completed: newStatus === "completed",
      failed: newStatus === "failed",
    };

    const { empData } = getLocalStorage();
    const updatedEmpData = empData.map((emp: any) => {
      if (emp.fullName === employeeName) {
        return {
          ...emp,
          tasks: emp.tasks.map((t: Task) =>
            t.title === task.title && t.date === task.date ? updatedTask : t
          ),
        };
      }
      return emp;
    });

    localStorage.setItem("Employee", JSON.stringify(updatedEmpData));
    setTasks((prev) =>
      prev.map((t) =>
        t.employeeName === employeeName &&
        t.task.title === task.title &&
        t.task.date === task.date
          ? { ...t, task: updatedTask }
          : t
      )
    );
  };

  const getAvailableOptions = (task: Task) => {
    const status = getTaskStatusKey(task);

    switch (status) {
      case "newTask":
        return ["active", "delete"];
      case "active":
        return ["completed", "failed", "delete"];
      case "failed":
      case "completed":
        return ["delete"];
      default:
        return [];
    }
  };

  return (
    <ErrorBoundary fallback={<div>Error loading task list!</div>}>
      <div className="bg-[#1c1c1c] p-5 rounded mt-10 mb-4 h-3/4 overflow-auto text-white">
        <div className="mt-4">
          {sortedTasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            sortedTasks.map(({ employeeName, task }, index) => {
              const statusKey = getTaskStatusKey(task);
              const bgClass = getStatusColor(statusKey);
              const availableOptions = getAvailableOptions(task);

              return (
                <div
                  ref={(el: any) => (taskCardsRef.current[index] = el)}
                  key={index}
                  className={`${bgClass} mb-4 py-2 px-4 flex flex-col rounded shadow`}>
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl">{employeeName}</h2>
                    <h5 className="text-sm">{task.date}</h5>
                  </div>
                  <h3 className="text-lg font-medium">{task.title}</h3>
                  <p className="text-sm opacity-90">{task.description}</p>
                  <div className="flex justify-between items-center">
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
                    {availableOptions.length > 0 && (
                      <select
                        value=""
                        onChange={(e) =>
                          handleStatusChange(employeeName, task, e.target.value)
                        }
                        className="bg-[#2d2d2d] text-white p-1 rounded border border-gray-600 focus:outline-none">
                        <option value="">Change Status</option>
                        {availableOptions.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AllTask;
