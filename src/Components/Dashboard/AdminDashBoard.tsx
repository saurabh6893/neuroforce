import { EmployeeDashboardProps } from "../../types";
import AllTask from "../Others/AllTask";
import CreateTask from "../Others/CreateTask";
import Header from "../Others/Header";

const AdminDashBoard = ({ data }: EmployeeDashboardProps) => {
  return (
    <div className="p-10 bg-[#1c1c1c] h-screen w-full ">
      <Header data={data} />
      <CreateTask />
      <AllTask />
    </div>
  );
};

export default AdminDashBoard;
