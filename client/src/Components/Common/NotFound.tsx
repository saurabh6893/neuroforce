import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      <Link
        to="/login"
        className="bg-emerald-600 px-6 py-3 rounded-full hover:bg-emerald-700 transition">
        Return to Login
      </Link>
    </div>
  );
};

export default NotFound;
