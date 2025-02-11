import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useDarkMode } from "../components/context/DarkModeContext"; 

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { dark, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-slate-800 p-4 text-white flex items-center h-20 fixed top-0 left-0 w-full z-10 mb">
        <button className="mr-4" onClick={() => router.push("/")}>
          Home
        </button>
        {currentUser?.email === "admin@mail.com" && (
          <button className="mr-4" onClick={() => router.push("/admin")}>
            Admin Dashboard
          </button>
        )}
        {currentUser?.email !== "admin@mail.com" && (
          <button className="mr-4" onClick={() => router.push("/dashboard")}>
            User Dashboard
          </button>
        )}
        <button className="mr-4" onClick={() => router.push("/cart")}>
          Cart
        </button>
        {currentUser && (
          <span className="ml-auto mr-4 flex flex-row gap-4 justify-center items-center">
            Welcome, {currentUser.name}
            <img className="rounded-full w-12" src={currentUser.avatar} alt="img" />
          </span>
          
        )}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
        <button className="px-8" onClick={() => toggleDarkMode()}>
          {dark ? <IoSunny /> : <IoMoon />}
        </button>
      </nav>
      <main className="flex-grow mt-20">{children}</main>
    </div>
  );
};

export default Layout;

