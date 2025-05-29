import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/taskApi";
import AllTask from "../Others/AllTask";
import CreateTask from "../Others/CreateTask";
import Header from "../Others/Header";
import ErrorBoundary from "../Common/ErrorBoundary";
import { Task } from "../../types";

type SortType = "name" | "statusAsc" | "statusDesc";

function getAdminActions(status: string) {
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
}

const AdminDashBoard = ({ data }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortType, setSortType] = useState<SortType>("name");
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchAllTasks = () => getAllTasks().then((res) => setTasks(res.data));

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <ErrorBoundary>
      <div className="p-10 bg-[#1c1c1c]  w-full relative">
        <Header
          data={data}
          onCreateTaskClick={() => setIsModalOpen(true)}
          isAdmin
        />
        <div className="mt-10 flex justify-end">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as SortType)}
            className="px-4 py-2 mb-4 bg-gray-700 text-white rounded">
            <option value="name">Sort by Name A-Z</option>
            <option value="statusAsc">Status: Failed → Completed</option>
            <option value="statusDesc">Status: Completed → Failed</option>
          </select>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-[#1c1c1c] rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-2xl text-white">
                  ✕
                </button>
              </div>
              <CreateTask
                onSuccess={() => {
                  fetchAllTasks();
                  setIsModalOpen(false);
                }}
              />
            </div>
          </div>
        )}
        <AllTask sortType={sortType} tasks={tasks} refetch={fetchAllTasks} />
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashBoard;
