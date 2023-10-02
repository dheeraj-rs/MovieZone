
import { Result } from "../../model/jsontots";
import { useEffect, useState } from "react";
import Progressbar from "../progressbar/progressbar";
import OwlCarousel from "react-owl-carousel";
import { fetchtocarousel } from '../../Api/movie_api';
import { fetchPopular, fetchtoday, fetchtoweek } from "../../Api/movie_api";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

function Movielist() {
    const [carousel, setCarousel] = useState<Result[]>([]);
    const [nowmovie, setNowmovie] = useState<Result[]>([]);
    const [popular, setPopular] = useState<Result[]>([]);
    const [trend, setTrend] = useState(false);

    // carousel
    const FetchCarousel = async () => {
        const result = await fetchtocarousel();
        setCarousel(result.results);
    };
    useEffect(() => {
        FetchCarousel();
    }, [])

    const options = {
        margin: 30,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 3000,
        responsive: {
            0: {
                items: 1,
            },
        },
    };

    // fetch Movies day & week
    useEffect(() => {
        const fetchMovies = async () => {
            if (trend) {
                const week = await fetchtoweek();
                setNowmovie(week.results);
            } else {
                const day = await fetchtoday();
                setNowmovie(day.results);
            }
        };
        fetchMovies();
    }, [trend]);

    // PopularMovies
    useEffect(() => {
        const fetchPopularMovies = async () => {
            const result = await fetchPopular();
            setPopular(result.results);
        };
        fetchPopularMovies();
    }, []);

    const getImageUrl = (poster_path: string) => {
        return `https://image.tmdb.org/t/p/original/${poster_path}`;
    };

    return (
        <>
            <div className="w-full px-10">
                <OwlCarousel className="owl-theme w-full h-full rounded-2xl" {...options}>
                    {carousel?.map((moviesss) => (
                        <div className="relative" key={moviesss.id}>
                            <div className="h-[400px] rounded-2xl overflow-hidden relative">
                                <Link to={`/detail/${moviesss.id}`}>
                                    <img
                                        src={getImageUrl(moviesss.backdrop_path)}
                                        alt="image"
                                        className="h-full w-full bg-cover object-top"
                                    />
                                </Link>
                                <div className="absolute inset-0 text-center flex items-end justify-center text-white">
                                    <h1 className="p-2 text-5xl mt-6 font-extrabold">
                                        {moviesss.title}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </div>
            <div className="mt-10 flex flex-col gap-10 rounded-2xl">
                <div className="w-full">
                    <div className="w-full flex flex-wrap items-center px-10 gap-5 text-white py-8">
                        <p className="text-xl font-semibold">Trending movies</p>
                        <div className="flex gap-5">
                            <button
                                className={`${trend ? 'bg-[#32313e9e] shadow-lg ' : 'bg-red-600 '} px-5 py-1 rounded-xl text-xs`}
                                onClick={() => setTrend(false)}>
                                Day
                            </button>
                            <button
                                className={`${trend ? 'bg-red-600' : 'bg-[#32313e9e] shadow-lg'} px-5 py-1 rounded-xl text-xs`}
                                onClick={() => setTrend(true)}>
                                Week
                            </button>
                        </div>
                    </div>
                    <div className="h-full py-5 overflow-y-scroll">
                        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5 px-10">
                            {nowmovie?.map((item) => (
                                <div className="w-full text-white flex flex-col relative" key={item.id}>
                                    <div className="w-full h-full">
                                        <Link to={`/detail/${item.id}`}>
                                            <img
                                                src={getImageUrl(item.poster_path)}
                                                alt="image"
                                                className="w-full h-80 object-cover object-top rounded-lg"
                                            />
                                        </Link>
                                    </div>
                                    <div className="flex flex-col items-center py-3">
                                        <p className="tracking-widest">
                                            {item.title.slice(0, 14)}
                                        </p>
                                        <p className="tracking-wide text-xs text-[#aeaeae]">
                                            {item.release_date}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-16 right-1 w-12 h-12">
                                        <Progressbar percentage={item.vote_average * 10} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="w-full flex flex-wrap items-center px-10 gap-5 text-white py-8">
                        <p className="text-xl font-semibold">Popular movies</p>
                    </div>
                    <div className="h-full py-5 overflow-y-scroll">
                        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5 px-10">
                            {popular?.map((item) => (
                                <div className="w-full text-white flex flex-col relative" key={item.id}>
                                    <div className="w-full h-full">
                                        <Link to={`/detail/${item.id}`}>
                                            <img
                                                src={getImageUrl(item.poster_path)}
                                                alt="image"
                                                className="w-full h-80 object-cover object-top rounded-lg"
                                            />
                                        </Link>                                </div>
                                    <div className="flex flex-col items-center py-3">
                                        <p className="tracking-widest">
                                            {item.title.slice(0, 14)}
                                        </p>
                                        <p className="tracking-wide text-xs text-[#aeaeae]">
                                            {item.release_date}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-16 right-1 w-8 h-8">
                                        <Progressbar percentage={item.vote_average * 10} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Movielist