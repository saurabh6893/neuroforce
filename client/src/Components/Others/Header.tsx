import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { Employee, Admin } from "../../types";
import { ROUTES } from "../../constants/routes";

interface HeaderProps {
  data: Employee | Admin | null;
  onCreateTaskClick?: () => void;
  isAdmin?: boolean;
}

const Header = ({ data, onCreateTaskClick, isAdmin }: HeaderProps) => {
  const authData = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authData?.setToken?.(null);
    authData?.setUser?.("");
    localStorage.removeItem("token");
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[#2d2d2d]">
      <h1 className="text-xl font-bold text-white">Neuroforce Task Manager</h1>
      <div className="flex items-center gap-4">
        <span className="text-white">Welcome, {data?.fullName}</span>
        {isAdmin && onCreateTaskClick && (
          <button
            onClick={onCreateTaskClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Task
          </button>
        )}
        {authData?.token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
