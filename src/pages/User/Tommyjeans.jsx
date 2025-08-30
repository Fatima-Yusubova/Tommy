import { useRef, useState } from "react";
import { Link } from "react-router";
import { IoPlay } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import CollectionItems from "../../components/User/Home/Collections/CollectionItems";
import { collectionsHer ,collectionsHim } from "../../constant/constant";


const Tommyjeans = ({ categoryId, category }) => {
  console.log( categoryId);
  console.log( category);
  const videoRef = useRef(null)
    const [flag ,setFlag] = useState(true)
    const toggleBtn= () =>{
     if (videoRef.current) {
       flag ? videoRef.current.pause() : videoRef.current.play()
       setFlag(!flag)
     }
    }

  return (
    <div>
      <div className="max-w-[95%] m-auto">
        <p>Tommy Jeans</p>
        <div className="flex w-[80%] flex-col gap-5 md:gap-0 md:flex-row justify-between m-auto items-center mt-20">
          <div>
            <h1 className="text-3xl text-[#212529] mb-3">{category?.name}</h1>
            <ul className="flex items-center gap-4">
              {category?.children?.map((item, i) => (
                <li key={i} className="underline">
                  <Link to={`/category/${item.id}`}> Shop {item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <p>
            Authentic. Original. Tommy. <br /> Born in the ’90s, made for today.
          </p>
        </div>
      </div>

      <div className="relative w-full min-h-120 md:min-h-screen mt-20">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={`https://media.tommy.com/us/static/images/scheduled_marketing/video/TJ_HERO_${
            window.innerWidth >= 768 ? "D_1366x688_D" : "M_390x566"
          }.mp4`}
          autoPlay
          muted
          loop
          playsInline
          ref={videoRef}
        ></video>
        <div className="absolute bottom-8 right-8 z-10">
          <button
            onClick={toggleBtn}
            className="bg-gray-400 bg-opacity-50  p-1 rounded-full text-black "
          >
            {flag ? <IoPauseOutline size={15} /> : <IoPlay size={15} />}
          </button>
        </div>
      </div>
      <div className="w-[80%] m-auto">
        <div className="flex flex-col gap-8 md:gap-0 md:flex-row justify-between  items-center my-15">
          <p className="text-center order-2 md:order-1">
            Throwback cool meets modern attitude with Tommy Jeans. From bold
            color- <br />
            blocking and iconic logo graphics to nostalgic streetwear, the
            collection taps <br />
            Mix and match to create, standout looks that celebrate the spirit of
            <br />
            individuality and self-expression.
          </p>
          <img
            className="w-[200px] order-1 md:order-2"
            src="/assets/img/Logo_dt.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 justify-between items-center">
          <img
            className="w-full max-w-sm lg:max-w-2xl h-auto object-cover"
            src="/assets/img/tommyjeans1.jpg"
            alt=""
          />
          <video
            className="w-full max-w-3xs h-80 lg:max-w-sm lg:h-auto object-cover"
            src="https://media.tommy.com/us/static/images/scheduled_marketing/video/TJW_379x503_D.mp4"
            autoPlay
            muted
            loop
            playsInline
          ></video>
        </div>
        <div className="w-full">
          <h2 className="text-2xl my-5">Tommy Jeans for her</h2>
          <div className="grid  grid-cols-2 gap-2 lg:grid-cols-5 lg:gap-5 mt-10">
            {collectionsHer.map((item, i) => (
              <CollectionItems image={item.image} link={item.link} key={i} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 justify-between items-center my-20">
          <video
            className="w-full max-w-3xs h-80 lg:max-w-sm lg:h-auto object-cover"
            src="https://media.tommy.com/us/static/images/scheduled_marketing/video/TJM_379x503_D.mp4"
            autoPlay
            muted
            loop
            playsInline
          ></video>
          <img
            className="w-full max-w-sm lg:max-w-2xl h-auto object-cover"
            src="/assets/img/tommyjeans2.jpg"
            alt=""
          />
        </div>
        <div className="w-full">
          <h2 className="text-2xl my-5">Tommy Jeans for him</h2>
          <div className="grid  grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-5 mt-10">
            {collectionsHim.map((item, i) => (
              <CollectionItems image={item.image} link={item.link} key={i} />
            ))}
          </div>
        </div>
        <div className="w-full my-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 justify-between items-center">
            <img
              className="w-full max-w-[420px] lg:max-w-[660px] h-auto object-cover flex-shrink-0"
              src="/assets/img/Jeans.jpg"
              alt=""
            />
            <img
              className="w-full max-w-[210px] lg:max-w-[379px] h-auto object-cover flex-shrink-0"
              src="/assets/img/Sweaters.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tommyjeans;