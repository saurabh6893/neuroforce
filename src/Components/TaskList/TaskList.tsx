import { EmployeeDashboardProps } from "../../types";
import { getStatusColor } from "../../utils/Statuses";

const TaskList = ({ data }: EmployeeDashboardProps) => {
  const taskData = data?.tasks;
  // ${getStatusColor(e.)}
  const getTaskStatus = (task: any) => {
    if (task.newTask) return "newTask";
    if (task.completed) return "completed";
    if (task.active) return "active";
    if (task.failed) return "failed";
    return "newTask";
  };

  return (
    <div
      id="tasklist"
      className="h-[55%] overflow-x-auto flex items-center 
       justify-start flex-nowrap w-full gap-5 py-5
  mt-10 ">
      {/* this block */}
      {taskData?.map((e, i) => {
        const status = getTaskStatus(e);
        const bgColor = getStatusColor(status);
        return (
          <div
            key={i}
            className={`flex-shrink-0 ${bgColor}
  h-full w-[300px] p-5  rounded-xl`}>
            <div className="flex justify-between items-center">
              <h3 className="bg-red-600 text-sm px-3 py-1 rounded">High</h3>
              <h4 className="text-sm">{e.date}</h4>
            </div>
            <h2 className="mt-5 text-2xl font-semibold">{e.title}</h2>
            <p className="text-sm">{e.description}</p>
          </div>
        );
      })}
      {/* till here */}
    </div>
  );
};

export default TaskList;
