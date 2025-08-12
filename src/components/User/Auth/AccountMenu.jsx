import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
const AccountMenu = () => {
  const [active, setActive] = useState("signup")

  return (
    <div className="max-w-xl mx-auto py-15 px-5 md:px-10 max-h-screen overflow-y-auto scrollbar-hidden">
      <ul className="text-[#464C52] text-xl flex justify-between mb-6">
        <li className={`pb-2 flex-1 text-center cursor-pointer ${
            active === "signin"
              ? "border-b-2 border-black text-black"
              : "border-b border-gray-200"
          }`}
          onClick={() => setActive("signin")}
        >Sign In</li>
        <li
          className={`pb-2 flex-1 text-center cursor-pointer ${
            active === "signup"
              ? "border-b-2 border-black text-black"
              : "border-b border-gray-200"
          }`}
          onClick={() => setActive("signup")}
        >Sign Up</li>
      </ul>
      {active === "signup" ? <SignUp/> : <SignIn />}
    </div>
  );
};

export default AccountMenu;
