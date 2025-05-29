import { useEffect, useState } from "react";
import { getMyTasks } from "../../api/taskApi";
import TaskList from "../TaskList/TaskList";
import Header from "../Others/Header";
import TaskListNumbers from "../Others/TaskListNumbers";
import { useParams, Navigate } from "react-router-dom";
import ErrorBoundary from "../Common/ErrorBoundary";
import { ROUTES } from "../../constants/routes";
import { Task } from "../../types";

const EmployeeDashboard = ({ data }: any) => {
  const { fullName } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = () => getMyTasks().then((res) => setTasks(res.data));

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!data?.fullName || data.fullName.replace(/\s+/g, "-") !== fullName) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <ErrorBoundary>
      <div className="p-10 bg-[#1c1c1c] h-screen">
        <Header data={data} />
        <TaskListNumbers tasks={tasks} />
        <TaskList tasks={tasks} refetch={fetchTasks} />
      </div>
    </ErrorBoundary>
  );
};

export default EmployeeDashboard;
