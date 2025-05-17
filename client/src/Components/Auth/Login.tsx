import { useState, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider";
import { ROUTES } from "../../constants/routes";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const authData = useContext(AuthContext);
  const navigate = useNavigate();

  const submitFunc = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;
      authData?.setToken?.(token);
      authData?.setUser?.(user.role);
      localStorage.setItem("token", token);
      setEmail("");
      setPassword("");
      navigate(
        user.role === "Admin"
          ? ROUTES.ADMIN_HOME
          : `/employee/${user.fullName.replace(/\s+/g, "-")}/home`
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <form
        className="flex flex-col items-center space-y-6 p-8 bg-gray-800 rounded-lg shadow-lg"
        onSubmit={submitFunc}>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-80 border-2 border-emerald-600 text-black outline-none bg-white text-xl rounded-full py-3 px-6 focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-80 border-2 border-emerald-600 text-black outline-none bg-white text-xl rounded-full py-3 px-6 focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          className="w-80 bg-emerald-600 text-white text-xl rounded-full py-3 px-6 mt-4 hover:bg-emerald-700 transition duration-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
