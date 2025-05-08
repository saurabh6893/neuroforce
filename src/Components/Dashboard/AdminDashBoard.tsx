import { useState } from "react";
import { EmployeeDashboardProps } from "../../types";
import AllTask from "../Others/AllTask";
import CreateTask from "../Others/CreateTask";
import Header from "../Others/Header";

const AdminDashBoard = ({ data }: EmployeeDashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="p-10 bg-[#1c1c1c] h-screen w-full ">
      <Header
        data={data}
        onCreateTaskClick={() => setIsModalOpen(true)}
        isAdmin
      />
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
            <CreateTask />
          </div>
        </div>
      )}

      <AllTask />
    </div>
  );
};

export default AdminDashBoard;
