import { useState, useEffect } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { X } from "lucide-react";

const AccountMenu = ({ activeTab = "signup" ,setAccount }) => {
  const [active, setActive] = useState(activeTab)
  useEffect(() => {
    setActive(activeTab)
  }, [activeTab]);

  return (
    <div className="relative max-w-xl mx-auto py-15 px-5 md:px-10 max-h-screen overflow-y-auto scrollbar-hidden">
      <button
        onClick={() => setAccount(false)}
        className="absolute top-4 md:hidden right-4 text-gray-500 hover:text-black"
      >
        <X size={20} />
      </button>
      <ul className="text-[#464C52] text-xl flex justify-between mb-6">
        <li
          className={`pb-2 flex-1 text-center cursor-pointer ${
            active === "signin"
              ? "border-b-2 border-black text-black"
              : "border-b border-gray-200"
          }`}
          onClick={() => setActive("signin")}
        >
          Sign In
        </li>
        <li
          className={`pb-2 flex-1 text-center cursor-pointer ${
            active === "signup"
              ? "border-b-2 border-black text-black"
              : "border-b border-gray-200"
          }`}
          onClick={() => setActive("signup")}
        >
          Sign Up
        </li>
      </ul>
      {active === "signup" ? <SignUp /> : <SignIn />}
    </div>
  );
};

export default AccountMenu;
