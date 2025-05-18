import { useState, FormEvent, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authData = useContext(AuthContext);

  const submitFunc = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authData?.loginWithBackend(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <form
        className="flex flex-col items-center space-y-6 p-48 bg-gray-800 rounded-lg shadow-lg"
        onSubmit={submitFunc}>
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
