import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider";
import Header from "../Others/Header";
import TaskListNumbers from "../Others/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import { ROUTES } from "../../constants/routes";
import { Employee, Task } from "../../types";

interface EmployeeDashboardProps {
  data: Employee | null;
}

const EmployeeDashboard = ({ data }: EmployeeDashboardProps) => {
  const { fullName } = useParams();
  const authData = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [sortType, setSortType] = useState<"title" | "dateAsc" | "dateDesc">(
    "title"
  );

  useEffect(() => {
    if (authData?.token && data?._id) {
      axios
        .get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${authData.token}` },
        })
        .then((response) => {
          const mappedTasks = response.data.map((task: any) => ({
            _id: task._id,
            title: task.title,
            description: task.description,
            date: new Date(task.createdAt).toISOString(),
            newTask: task.status === "New",
            active: task.status === "Accepted",
            completed: task.status === "Completed",
            failed: task.status === "Failed",
            assignedTo: task.assignedTo
              ? { _id: task.assignedTo._id, fullName: task.assignedTo.fullName }
              : undefined,
            createdBy: task.createdBy,
          }));
          setTasks(mappedTasks);
          authData?.setTasks?.(mappedTasks);
        })
        .catch(() => {
          setError("Failed to fetch tasks");
        });
    }
  }, [authData?.token, data?._id]);

  if (data?.fullName?.replace(/\s+/g, "-") !== fullName) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <div className="p-10 bg-[#1c1c1c] h-screen">
      <Header data={data} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="mt-10 flex justify-end">
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value as any)}
          className="bg-[#2d2d2d] text-white p-2 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400">
          <option value="title">Sort by Title A-Z</option>
          <option value="dateAsc">Date: Oldest First</option>
          <option value="dateDesc">Date: Newest First</option>
        </select>
      </div>
      <TaskListNumbers tasks={tasks} />
      <TaskList data={data} tasks={tasks} sortType={sortType} />
    </div>
  );
};

export default EmployeeDashboard;
