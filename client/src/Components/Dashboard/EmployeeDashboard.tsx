import { Navigate, useParams } from "react-router-dom";
import { EmployeeDashboardProps } from "../../types";
import Header from "../Others/Header";
import TaskListNumbers from "../Others/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import { ROUTES } from "../../constants/routes";

const EmployeeDashboard = ({ data }: EmployeeDashboardProps) => {
  const { fullName } = useParams();
  if (data?.fullName?.replace(/\s+/g, "-") !== fullName) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <div className="p-10 bg-[#1c1c1c] h-screen">
      <Header data={data} />
      <TaskListNumbers data={data} />
      <TaskList data={data} key={data?.id} />
    </div>
  );
};

export default EmployeeDashboard;
