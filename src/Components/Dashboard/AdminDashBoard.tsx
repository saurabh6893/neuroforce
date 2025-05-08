import { useState } from "react";
import { EmployeeDashboardProps } from "../../types";
import AllTask from "../Others/AllTask";
import CreateTask from "../Others/CreateTask";
import Header from "../Others/Header";

const AdminDashBoard = ({ data }: EmployeeDashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortType, setSortType] = useState<"name" | "statusAsc" | "statusDesc">(
    "name"
  );

  return (
    <div className="p-10 bg-[#1c1c1c] h-screen w-full relative">
      <Header
        data={data}
        onCreateTaskClick={() => setIsModalOpen(true)}
        isAdmin
      />

      {/* Sort control placed here */}
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
            <CreateTask onSuccess={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      <AllTask sortType={sortType} />
    </div>
  );
};

export default AdminDashBoard;
