import React, { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";

const AccountMenu = () => {
  const [password, setPassword] = useState(false)
  const [checked, setChecked] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-15 px-5 md:px-10 max-h-screen overflow-y-auto scrollbar-hidden">
      <ul className="text-[#464C52] text-xl flex justify-between mb-6">
        <li className="border-b-2 border-black pb-2 flex-1 text-center cursor-pointer">
          Sign In
        </li>
        <li className="border-b border-gray-200 pb-2 flex-1 text-center cursor-pointer">
          Sign Up
        </li>
      </ul>
      <div className="bg-gray-100 rounded-lg p-6 mt-10 mb-8">
        <p className="text-[#26282B] mb-4 text-sm">
          Join Hilfiger Club today for VIP access. Members get perks like:
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li className="text-[#212529] text-sm">Early Access to Sales</li>
          <li className="text-[#212529] text-sm">Birthday & Welcome Gifts</li>
          <li className="text-[#212529] text-sm">Exclusive Promotions</li>
          <li className="text-[#212529] text-sm">Extended Returns</li>
        </ul>
      </div>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="First Name*"
              className="w-full text-sm px-4 py-4 border border-gray-300 rounded focus:outline-none focus:border-black text-[#464C52]"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Last Name*"
              className="w-full px-4 text-sm py-4 border border-gray-300 rounded focus:outline-none focus:border-black text-[#464C52]"
            />
          </div>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email*"
            className="w-full text-sm px-4 py-4 border border-gray-300 rounded focus:outline-none focus:border-black text-[#464C52]"
          />
        </div>
        <div className="relative">
          <input
            type={password ? "text" : "password"}
            placeholder="Create a Password*"
            className="w-full text-sm px-4 py-4 border border-gray-300 rounded focus:outline-none focus:border-black text-[#464C52] pr-12"
          />
          <button
            type="button"
            onClick={() => setPassword(!password)} className="absolute right-4 top-4  text-gray-500" >
            {password ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="flex items-start gap-3 mt-6">
          <div className=" mt-1 cursor-pointer" onClick={() => setChecked(!checked)} >
            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                checked ? "bg-black border-black" : "border-gray-400" }`}>
                {checked && <Check />}
            </div>
          </div>
          <p className="text-sm text-[#484848] leading-5">
            I would like to receive updates on the latest products and
            promotions via email or other channels. See
            <a href="#" className="underline text-[#464C52]">Privacy Policy </a>, which includes our
            <a href="#" className="underline text-[#464C52]"> Notice of Financial Incentive </a>and the <a href="#" className="underline text-[#464C52]">Terms and Conditions</a>, for more information.
          </p>
        </div>
        <button className="w-full bg-black text-white py-4 rounded font-medium text-lg mt-8">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
