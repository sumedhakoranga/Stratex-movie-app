import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, toggleFavorite } from "../redux/moviesSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function MoviesList() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.entities);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 7000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={`https://dummyapi.online/api/${movie.image}`}
                alt={movie.movie}
                className="w-full h-auto rounded-md"
              />
              <div className="flex justify-between items-center mt-4">
                <button
                  className={`p-2 text-sm rounded m-auto ${
                    movie.favorite
                      ? "bg-gray-900 text-gray-200"
                      : "bg-red-700 text-white"
                  }`}
                  onClick={() => dispatch(toggleFavorite(movie.id))}
                >
                  {movie.favorite ? "༄ Leave it" : "ᥫ᭡. Love it!"}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-lg p-4 mt-6 transition duration-300 ease-in-out hover:shadow-2xl cursor-pointer"
          >
            <img
              src={movie.image}
              alt={movie.movie}
              className="w-full h-auto rounded-md"
            />
            <h2 className="text-lg font-bold mt-2">{movie.movie}</h2>
            <p className="text-gray-600">Rating: {movie.rating}</p>
            <div className="flex justify-between items-center mt-4">
              <a
                href={movie.imdb_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
              >
                View on IMDb
              </a>
              <button
                className={`p-2 text-sm rounded `}
                onClick={() => dispatch(toggleFavorite(movie.id))}
              >
                {movie.favorite ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
