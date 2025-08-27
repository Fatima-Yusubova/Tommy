import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/authslice"
import OpenMenu from "../../ui/OpenMenu";
import AccountMenu from "../Auth/AccountMenu";

const UserMenu = () => {
  const [account, setAccount] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  if(user){
    console.log(user)
  }
  

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-black w-[200px] min-h-[130px] text-white p-4">
      <div className="flex flex-col gap-3 items-start text-sm font-medium tracking-tight p-2">
        {user ? (
          <>
            <div className="text-white font-semibold mb-3">
             Hi  {user?.user?.firstName}
            </div>
            <button className="relative overflow-hidden group pb-1.5">
              My Account
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button className="relative overflow-hidden group pb-1.5">
              Track Order
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={handleLogout}
              className="relative overflow-hidden group pb-1.5 text-red-300 hover:text-red-200"
            >
              Logout
              <span className="absolute bottom-0 left-0 w-0 h-px bg-red-300 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </>
        ) : (
          // İstifadəçi login olmayıbsa
          <>
            <button className="relative overflow-hidden group pb-1.5">
              Sign In
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => setAccount(true)}
              className="relative overflow-hidden group pb-1.5"
            >
              Create Account
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button className="relative overflow-hidden group pb-1.5">
              Track Order
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
          </>
        )}
      </div>

      <OpenMenu open={account} setOpen={setAccount} width="max-w-xl">
        <AccountMenu setAccount={setAccount} />
      </OpenMenu>
    </div>
  );
};

export default UserMenu;
