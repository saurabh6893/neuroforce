import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitFunc = (e: any) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <div className="border-2 border-red-600 p-20 rounded-lg">
        <form
          className="flex flex-col items-center space-y-6 p-8 bg-gray-800 rounded-lg shadow-lg"
          onSubmit={(e) => submitFunc(e)}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="enter email"
            className="w-80 border-2 border-emerald-600 text-black outline-none bg-white text-xl rounded-full py-3 px-6 focus:ring-2 focus:ring-emerald-500"
          />
          <input
            required
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-80 border-2 border-emerald-600 text-black outline-none bg-white text-xl rounded-full py-3 px-6 focus:ring-2 focus:ring-emerald-500"
          />
          <button className="w-80 bg-emerald-600 text-white text-xl rounded-full py-3 px-6 mt-4 hover:bg-emerald-700 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
