import { EmployeeDashboardProps } from "../../types";
import { getStatusColor } from "../../utils/Statuses";

const TaskListNumbers = ({ data }: EmployeeDashboardProps) => {
  const counts = {
    newTask: data?.tasks?.filter((task) => task.newTask).length || 0,
    completed: data?.tasks?.filter((task) => task.completed).length || 0,
    active: data?.tasks?.filter((task) => task.active).length || 0,
    failed: data?.tasks?.filter((task) => task.failed).length || 0,
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div
        className={`py-6 px-6 rounded-xl ${getStatusColor(
          "newTask"
        )} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        <h2 className="text-4xl font-bold">{counts.newTask}</h2>
        <h3 className="text-lg font-medium opacity-90">New Task</h3>
      </div>
      <div
        className={`py-6 px-6 rounded-xl ${getStatusColor(
          "completed"
        )} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        <h2 className="text-4xl font-bold">{counts.completed}</h2>
        <h3 className="text-lg font-medium opacity-90">Completed</h3>
      </div>
      <div
        className={`py-6 px-6 rounded-xl ${getStatusColor(
          "active"
        )} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        <h2 className="text-4xl font-bold">{counts.active}</h2>
        <h3 className="text-lg font-medium opacity-90">Active</h3>
      </div>
      <div
        className={`py-6 px-6 rounded-xl ${getStatusColor(
          "failed"
        )} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        <h2 className="text-4xl font-bold">{counts.failed}</h2>
        <h3 className="text-lg font-medium opacity-90">Failed</h3>
      </div>
    </div>
  );
};

export default TaskListNumbers;
