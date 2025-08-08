import React from 'react'

const NewsForm = () => {
  return (
    <div className="py-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className=" p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent text-gray-700 placeholder-gray-500"
            />
            <button className="w-full md:w-auto px-8 py-2.5 bg-black text-white font-semibold rounded-md hover:bg-gray-800 hover:underline transition-colors duration-200">
              Join Now
            </button>
          </div>
          <div className="flex items-start space-x-3 mt-4">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
            />
            <label
              htmlFor="terms"
              className="text-xs text-black font-medium leading-relaxed"
            >
              By clicking the Join Now button, I agree to the{" "}
              <a
                href="#"
                className="underline"
              >
                Terms and Conditions
              </a>
              and to receive updates on the latest products and promotions via
              email or other channels. See
              <a
                href="#"
                className=" underline"
              >
                Privacy Policy
              </a>
              , which includes our
              <a
                href="#"
                className=" underline "
              >
                Notice of Financial Incentive
              </a>
              , for more information.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsForm