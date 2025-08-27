import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { IoPlay } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { useGetAllCategoryQuery } from "../../../../store/eccomerceApi";


const HeroBanner = () => {
    const { data: category } = useGetAllCategoryQuery()
  
  const videoRef = useRef(null)
  const [flag ,setFlag] = useState(true)
  const toggleBtn= () =>{
   if (videoRef.current) {
     flag ? videoRef.current.pause() : videoRef.current.play()
     setFlag(!flag)
   }
  }
   
  return (
    <div className="relative w-full min-h-screen">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={`https://media.tommy.com/us/static/images/scheduled_marketing/video/20250724_HP_Hero_Video_${
          window.innerWidth >= 768 ? "dt" : "mb"
        }.mp4`}
        autoPlay
        muted
        loop
        playsInline
        ref={videoRef}
      ></video>
      <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center text-center text-white z-10">
        <p className="text-xl font-garamond">This Just In</p>
        <h2 className="text-6xl">Ace Your Look</h2>
        <p className="text-[16px] font-medium tracking-tight hidden lg:block">
          Serve up style with our favorite finds, from standout <br />
          graphic tees to fall-forward, varsity-inspired picks.
        </p>
      </div>
      <div className="absolute bottom-20 left-0 right-0 flex justify-center z-10">
        <ul className="flex  justify-center flex-nowrap items-center gap-10 text-white tracking-tight text-[16px] underline">
          <li>
            <Link to={`/category/${category?.[5]?.id}`}>Shop Men</Link>
          </li>
          <li>
            <Link to={`/category/${category?.[0]?.id}`}>Shop Women</Link>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-8 right-8 z-10">
        <button
          onClick={toggleBtn}
          className="bg-gray-400 bg-opacity-50  p-1 rounded-full text-black "
        >
          {flag ? <IoPauseOutline size={15}  /> : <IoPlay size={15} />}
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
