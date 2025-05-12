import { useState } from "react";
import { Employee, EmployeeDashboardProps, Task } from "../../types";
import { getStatusColor } from "../../utils/Statuses";

const TaskList = ({ data }: EmployeeDashboardProps) => {
  console.log(data);
  if (!data || !("tasks" in data)) {
    return <div>No tasks available</div>;
  }

  const [newData, setNewData] = useState<Employee>(data);
  const empName = data.fullName;
  const taskData = newData.tasks;

  const getTaskStatus = (task: Task) => {
    if (task.completed) return "completed";
    if (task.failed) return "failed";
    if (task.active) return "active";
    if (task.newTask) return "newTask";
    return "newTask";
  };

  const handleUpdate = (clickedTask: Task) => {
    setNewData((prev) => {
      const updatedTasks = prev.tasks.map((task) => {
        if (
          task.title === clickedTask.title &&
          task.date === clickedTask.date
        ) {
          const updatedTask = { ...task };
          updatedTask.newTask = false;
          updatedTask.active = false;
          updatedTask.completed = false;
          updatedTask.failed = false;
          if (task.newTask) {
            updatedTask.active = true;
          } else if (task.active) {
            updatedTask.completed = true;
          }
          return updatedTask;
        }
        return { ...task }; // Ensure a fresh copy
      });
      return { ...prev, tasks: updatedTasks };
    });
  };

  return (
    <div className="h-[55%] overflow-x-auto flex items-center justify-start flex-nowrap w-full gap-5 py-5 mt-10">
      {taskData?.map((task) => {
        const status = getTaskStatus(task);
        const bgColor = getStatusColor(status);
        const showButton = !task.completed && !task.failed;

        return (
          <div
            key={`${task.title}-${task.date}`}
            className={`flex-shrink-0 ${bgColor} h-full w-[300px] p-5 rounded-xl relative`}>
            <div className="flex justify-between items-center">
              <h3 className="bg-red-600 text-sm px-3 py-1 rounded">High</h3>
              <h4 className="text-sm">{task.date}</h4>
            </div>
            <h2 className="mt-5 text-2xl font-semibold">{task.title}</h2>
            <p className="text-sm">{task.description}</p>

            {showButton && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={() => handleUpdate(task, empName)}
                  className="px-20 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:from-indigo-600 hover:to-blue-600 active:scale-95">
                  {status === "newTask" ? "Start Task" : "Complete Task"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
