import React from 'react'

const SignIn = () => {
   return (
     <>
       <div className="bg-gray-100 rounded-lg p-6 mt-10 mb-8">
         <p className="text-[#26282B] mb-4 text-sm font-medium">
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
         <div>
           <input type="email" placeholder="Email*"
             className="w-full text-sm px-4 py-4 border border-red-500 rounded focus:outline-none focus:border-black text-red-500" />
           <p className="text-red-500 text-sm mt-2"> The email field cannot be blank.</p>
         </div>
         <button className="w-full bg-black text-white py-4 rounded font-medium text-sm">
           Sign in with email and password
         </button>
         <button className="w-full border border-gray-300 text-black py-4 rounded font-medium text-sm">
           Email me a verification code
         </button>
         <p className="text-sm text-gray-600 text-center mt-6">
           By creating an account, I agree to the
           <a href="#" className="underline text-[#464C52]">Terms and Conditions</a>and
           <a href="#" className="underline text-[#464C52]">Privacy Policy</a> .
         </p>
       </div>
     </>
   )
}
export default SignIn;