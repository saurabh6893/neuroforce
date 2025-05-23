import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Employee, EmployeeDashboardProps, Task } from "../../types";
import { getStatusColor } from "../../utils/Statuses";
import { getLocalStorage } from "../../utils/localStorage";
import ErrorBoundary from "../Common/ErrorBoundary";

const TaskList = ({ data }: EmployeeDashboardProps) => {
  if (!data || !("tasks" in data)) {
    return <div>No tasks available</div>;
  }

  const [newData, setNewData] = useState<Employee>(data);
  const taskData = newData.tasks;
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const { empData } = getLocalStorage();
    const currentEmployee = empData.find((emp: Employee) => emp.id === data.id);
    if (currentEmployee) setNewData(currentEmployee);
  }, [data.id]);

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.set(cardsRef.current, { y: "400%", opacity: 0 });

      gsap.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.15,
      });
    }
  }, [taskData]);

  const getTaskStatus = (task: Task) => {
    if (task.completed) return "completed";
    if (task.failed) return "failed";
    if (task.active) return "active";
    if (task.newTask) return "newTask";
    return "newTask";
  };

  const handleUpdate = (clickedTask: Task) => {
    const { empData } = getLocalStorage();

    const employeeIndex = empData.findIndex(
      (emp: Employee) => emp.id === data.id
    );
    if (employeeIndex === -1) return;

    const updatedTasks = empData[employeeIndex].tasks.map((task: Task) => {
      if (task.title === clickedTask.title && task.date === clickedTask.date) {
        return {
          ...task,
          ...(task.newTask
            ? { newTask: false, active: true }
            : task.active
            ? { active: false, completed: true }
            : {}),
        };
      }
      return task;
    });

    const newEmpData = empData.map((emp: Employee, index: any) =>
      index === employeeIndex ? { ...emp, tasks: updatedTasks } : emp
    );

    localStorage.setItem("Employee", JSON.stringify(newEmpData));

    setNewData((prev) => ({
      ...prev,
      tasks: updatedTasks,
    }));
  };

  return (
    <ErrorBoundary fallback={<div>Error loading tasks!</div>}>
      <div className="h-[55%] overflow-x-auto flex items-center justify-start flex-nowrap w-full gap-5 py-5 mt-10">
        {taskData?.map((task, index) => {
          const status = getTaskStatus(task);
          const bgColor = getStatusColor(status);
          const showButton = !task.completed && !task.failed;

          return (
            <div
              ref={(el: any) => (cardsRef.current[index] = el)}
              key={`${task.title}-${task.date}`}
              className={`flex-shrink-0 ${bgColor} h-full w-[300px] p-5 rounded-xl relative`}>
              <div className="flex justify-between items-center">
                <h4 className="text-sm">{task.date}</h4>
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{task.title}</h2>
              <p className="text-sm">{task.description}</p>

              {showButton && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => handleUpdate(task)}
                    className="px-20 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:from-indigo-600 hover:to-blue-600 active:scale-95">
                    {status === "newTask" ? "Start Task" : "Complete Task"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};

export default TaskList;
