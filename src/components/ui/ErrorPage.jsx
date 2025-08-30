import React from "react";
import { useNavigate } from "react-router";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ErrorPage = ({ onRefresh }) => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-9xl font-bold text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-8">
          Not Found
        </h2>
        <DotLottieReact
          src="https://lottie.host/2f044972-4cff-44d3-b656-2b5ea1cadc51/2itvjQloVp.lottie"
          loop
          autoplay
        />
        <button
          onClick={handleGoHome}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Back to home page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
