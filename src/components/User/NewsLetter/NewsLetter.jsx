import React from "react";
import NewsText from "./NewsText";
import NewsForm from "./NewsForm";

const NewsLetter = () => {
  return (
    <div className="max-w-[95%] m-auto py-8 md:py-12">
      <div className="flex flex-col items-center">
       <NewsText/>
       <NewsForm/>
      </div>
    </div>
  );
};

export default NewsLetter;
