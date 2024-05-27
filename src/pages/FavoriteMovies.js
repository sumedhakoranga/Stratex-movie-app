import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/moviesSlice";

function FavoriteMovies() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.movies.favorites);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 cursor-pointer">
      {favorites.map((movie) => (
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
              className={`p-2 text-sm rounded`}
              onClick={() => dispatch(toggleFavorite(movie.id))}
            >
              {movie.favorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteMovies;
