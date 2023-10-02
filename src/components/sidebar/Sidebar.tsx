import { useEffect, useState } from "react";
import { fetchuser } from "../../Api/movie_api";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { BsBrowserSafari } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineWifi } from "react-icons/ai";

function Sidebar() {
  const [user, setUser] = useState([]);

  // fetchuser dummyusers
  useEffect(() => {
    const FetchUser = async () => {
      const data = await fetchuser();
      setUser(data.users);
    };
    FetchUser();
  }, []);

  return (
    <>
      <div className="w-full h-16 flex items-center pl-10">
        <p className="text-xl text-white">
          Movie <span className="text-red-600">Zone</span>
        </p>
      </div>
      <div className="w-full h-60 pl-10 flex flex-col gap-5 justify-end">
        <p>News Feed</p>
        <div className="flex items-center gap-2">
          <BsBrowserSafari />
          <p>Browse</p>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineHeart />
          <p>Watchlist</p>
        </div>
        <div className="flex items-center gap-2">
          <SlCalender />
          <p>Coming Soon</p>
        </div>
        <hr className="w-[70%] mt-10" />
      </div>

      <div className="w-full pl-10 pt-12">
        <p className="sticky top-0 py-5">Following</p>
        <div className="w-full h-80 flex flex-col gap-5 overflow-y-scroll">
          {user?.map((item: { id: number, image: string, firstName: string }) => (
            <div className="flex items-center gap-5  pr-20" key={item.id}>
              <div className=" w-[20%] bg-white rounded-full">
                <img
                  src={item.image}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
              </div>
              <div className="flex justify-between w-[80%]">
              <p>{item.firstName}</p>
              <AiOutlineWifi className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-12 flex items-center absolute bottom-0 pl-10 gap-5">
        <RiLogoutCircleRLine className="w-6 h-6" />
        <p>Log Out</p>
      </div>
    </>

  )
}

export default Sidebar