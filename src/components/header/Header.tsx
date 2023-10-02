import { MdOutlineNotificationsActive } from "react-icons/md";
import { BsChatRightText } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { Searchdata } from "../../Api/movie_api";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
}

type Item = {
  id: number;
  title: string;
};

function Header() {
  const [sdata, setSdata] = useState<Movie[]>([]);
  const [sujecion, setSujecion] = useState<string>("");
  const [togglepage, setTogglepage] = useState(false);
  const [selectdata, setSelectdata] = useState<Item | null>(null);
  console.log("🚀 ~ file: Header.tsx:24 ~ Header ~ selectdata:", selectdata)

  useEffect(() => {
    const searchMovie = async () => {
      const result = await Searchdata(sujecion);
      console.log("🚀 ~ searchMovie ~ result:", result.results);
      setSdata(result.results);
    };
    searchMovie();
  }, [sujecion]);

  const getImageUrl = (poster_path: string) => {
    return `https://image.tmdb.org/t/p/original/${poster_path}`;
  };

  const handleSelectItem = (item: Item) => {
    setSelectdata(item);
  };

  return (
    <nav className="w-full flex flex-wrap items-center justify-between py-5 px-5 sticky top-0 backdrop-blur-md bg-[#05041524] z-50">
      <div className="flex h-full items-center  md:order-1">
        <div className="w-16 h-full flex items-center">
          <Link to="/"><IoIosArrowBack className="w-4 h-4 text-white" /></Link>
          <IoIosArrowForward className="w-4 h-4 text-white" />
        </div>
        <div className="md:min-w-[500px] w-full relative">
          <input
            onFocus={() => setTogglepage(true)}
            onBlur={() => setTogglepage(false)}
            type="text"
            value={sujecion}
            className="bg-[#00030b] w-full rounded-3xl outline-none p-2 text-white px-12"
            placeholder="Search everything"
            onChange={(e) => setSujecion(e.target.value)}
          />
          <LuSearch className="w-6 h-6 absolute left-3 top-2 text-[#30304e]" />
          <CgMenuRightAlt className="w-6 h-6 absolute right-3 top-2 text-[#30304e]" />
        </div>
        <div
          className={`${togglepage ? 'visible' : 'opacity-0'} absolute top-14 left-28 h-64 rounded-b-lg backdrop-blur-3xl bg-[#050415e7] duration-300 overflow-y-scroll`}
        >
          {sdata.map((item: Item) => (
            <Link to={`/detail/${item.id}`} key={item.id} >

              <div
                className="w-96 flex gap-3 text-white z-50 py-2 pl-5"
              >
                <img
                  src={getImageUrl(item.poster_path)}
                  alt=""
                  className="w-14 h-14"
                />

                <p onClick={() => handleSelectItem(item)}>{item.title.slice(0, 23)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-40 flex items-center justify-end gap-4 lg:justify-evenly mt-5 md:mt-0  md:order-2 ">
        <BsChatRightText className="w-5 h-5 text-white" />
        <MdOutlineNotificationsActive className="w-6 h-6 text-white" />
        <div className="w-8 h-8 rounded-full bg-neutral-200">
          <img src="https://img.freepik.com/free-vector/blue-wavy-forms-transparent-background_1035-6744.jpg?w=2000"
            className=" w-full h-full object-cover rounded-full" alt="" />
        </div>
      </div>
    </nav>
  );
}

export default Header;
