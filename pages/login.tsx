import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../services/authService";
import { User } from "../types";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
import { axiosInstance } from "../api";
import { useDarkMode } from "../components/context/DarkModeContext";
import { IoMoon, IoSunny } from "react-icons/io5";
const LoginPage = () => {
  const { dark, toggleDarkMode } = useDarkMode();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token, refresh_token } = await login(email, password);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      const { data: userProfile } = await axiosInstance.get("/auth/profile");
      const user: User = {
        name: userProfile.name,
        avatar: userProfile.avatar || "",
        email: userProfile.email,
        password: userProfile.password,
        orders: userProfile.orders || [],
      };
      const users: User[] = getLocalStorageItem("users") || [];

      const userExists = users.some((u) => u.email === user.email);
      if (!userExists) {
        const updatedUsers = [...users, user];
        setLocalStorageItem("users", updatedUsers);
      }
      localStorage.setItem("currentUser", JSON.stringify(user));
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="container min-h-screen py-2 dark:bg-slate-900 dark:text-white">
      <div className="flex justify-end p-4">
        <button className="px-8" onClick={() => toggleDarkMode()}>
          {dark ? <IoSunny /> : <IoMoon />}
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-6">Login</h1>
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2  dark:text-white"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2  dark:text-white"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
