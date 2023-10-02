import { useEffect, useState } from "react";
import { MVdetails, fetchVideo } from "../../Api/movie_api";
import { useParams } from "react-router-dom";
import Header from "../header/Header";

function Moviedetails() {
    const [mvdetail, setMvdetail] = useState<any>({});
    const [companie, setCompanie] = useState<any[]>([]);
    const [mvideos, setMvideos] = useState<any[]>([]);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        const getDetails = async () => {
            const fetchingDetailData = await MVdetails(id);
            const fetchplayvideo = await fetchVideo(id);
            setMvdetail(fetchingDetailData);
            setMvideos(fetchplayvideo.videos.results)
            setCompanie(fetchingDetailData.genres);
        };
        getDetails();
    }, [id]);

    const getImageUrl = (poster_path: string) => {
        return `https://image.tmdb.org/t/p/original/${poster_path}`;
    };

    const getLogoimage = (backdrop_path: string) => {
        return `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    };

    return (
        <div className="w-screen h-screen ">
            <div className="w-full h-16 absolute top-0 z-50">
                <Header />
            </div>
            <img
                src={getImageUrl(mvdetail.poster_path)}
                alt="image"
                className="h-full w-full bg-cover object-top"
            />
            <div className="p-20 text-white absolute top-0 bg-gradient-to-r from-[#000000dd] via-[#00000082] to-transparent w-full h-full">
                <img
                    src={getLogoimage(mvdetail.backdrop_path)}
                    alt="image"
                    className="h-40 w-40 bg-cover object-top"
                />
                <p className="text-white text-3xl font-extrabold leading-10">
                    {mvdetail.title}
                </p>
                <p className="text-white text-lg md:leading-10">{mvdetail.overview}</p>
                <p>Status: {mvdetail.status}</p>
                <p>Rating: {mvdetail.vote_average}</p>
                <p>Tagline: {mvdetail.tagline}</p>
                <p>Release date: {mvdetail.release_date}</p>
                <p>
                    Type:{" "}
                    {companie.map((e) => (
                        <span key={e.id} className="pl-10">
                            {e.name}
                        </span>
                    ))}
                </p>
                {
                    mvideos.length > 0 && (
                        <div className="w-[300px] h-[180px] relative my-5 ">
                            <iframe className="w-full h-full absolute top-0"
                                src={`https://www.youtube.com/embed/${mvideos[1].key}`}
                                title="movie trailer"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )
                } </div>
        </div>
    );
}

export default Moviedetails;
