import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY

// movie/now_playing carousel
export const fetchtocarousel = async () => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

// trending/movie/day
export const fetchtoday = async () => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

// trending/movie/week
export const fetchtoweek = async () => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

// movie/popular
export const fetchPopular = async () => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}
// movie/search
export const Searchdata = async (query: string) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}}&api_key=${API_KEY}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

// movie/Details
export const MVdetails = async (movieid: number) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${API_KEY}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

// movie/video
export const fetchVideo = async (id: number) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
        console.log("hy,", data);
        return data
    } catch (error) {
        console.log(error);
    }
}

// dummy users
export const fetchuser = async () => {
    try {
        const { data } = await axios.get(`https://dummyjson.com/users`);
        return data;
    } catch (error) {
        console.log(error);
    }
}



