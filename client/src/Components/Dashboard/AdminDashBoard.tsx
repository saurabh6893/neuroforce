import { useEffect, useState } from "react";
import { EmployeeDashboardProps, Employee, Task } from "../../types";
import AllTask from "../Others/AllTask";
import CreateTask from "../Others/CreateTask";
import Header from "../Others/Header";
import { getLocalStorage } from "../../utils/localStorage";
import ErrorBoundary from "../Common/ErrorBoundary";

const AdminDashBoard = ({ data }: EmployeeDashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortType, setSortType] = useState<"name" | "statusAsc" | "statusDesc">(
    "name"
  );
  const [tasks, setTasks] = useState<{ employeeName: string; task: Task }[]>(
    []
  );

  const fetchAllTasks = () => {
    const { empData } = getLocalStorage();
    const allTasks = empData.flatMap((emp: Employee) =>
      emp.tasks.map((task) => ({
        employeeName: emp.fullName,
        task,
      }))
    );
    setTasks(allTasks);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <ErrorBoundary fallback={<div>Admin dashboard failed!</div>}>
      <div className="p-10 bg-[#1c1c1c] h-screen w-full relative">
        <Header
          data={data}
          onCreateTaskClick={() => setIsModalOpen(true)}
          isAdmin
        />

        <div className="mt-10 flex justify-end">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as any)}
            className="bg-[#2d2d2d] text-white p-2 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400">
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
                  className="text-white text-xl hover:text-red-400 transition">
                  ✕
                </button>
              </div>
              <CreateTask
                onSuccess={() => {
                  fetchAllTasks(); // 🔁 Refresh task list
                  setIsModalOpen(false); // ❌ Close modal
                }}
              />
            </div>
          </div>
        )}

        <AllTask sortType={sortType} tasks={tasks} />
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashBoard;
