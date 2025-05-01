import AllTask from "../Others/AllTask";
import CreateTask from "../Others/CreateTask";
import Header from "../Others/Header";

const AdminDashBoard = () => {
  return (
    <div className="p-10 bg-[#1c1c1c] h-screen w-full">
      <Header />
      <CreateTask />
      <AllTask />
    </div>
  );
};

export default AdminDashBoard;
