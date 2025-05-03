import { EmployeeDashboardProps } from "../../types";
import Header from "../Others/Header";
import TaskListNumbers from "../Others/TaskListNumbers";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboard = ({ data }: EmployeeDashboardProps) => {
  return (
    <div className="p-10 bg-[#1c1c1c] h-screen">
      <Header data={data} />
      <TaskListNumbers data={data} />
      <TaskList data={data} key={data?.id} />
    </div>
  );
};

export default EmployeeDashboard;
