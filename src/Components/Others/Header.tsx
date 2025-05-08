import { EmployeeDashboardProps } from "../../types";

interface HeaderProps extends EmployeeDashboardProps {
  isAdmin?: boolean;
  onCreateTaskClick?: () => void;
}

const Header = ({ data, isAdmin, onCreateTaskClick }: HeaderProps) => {
  return (
    <div className="flex justify-between items-end text-blue-200">
      <h1 className="text-2xl font-medium">
        Hello
        <br />
        <span className="text-3xl font-semibold"> {data?.firstName}</span>
      </h1>

      <div className="flex space-x-4">
        {isAdmin && (
          <button
            onClick={onCreateTaskClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            + Create Task
          </button>
        )}
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
