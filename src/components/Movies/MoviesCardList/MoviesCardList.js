import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  moviesList,
  onSaveClick,
  onDeleteClick,
  savedMovies,
}) {
  const location = useLocation();

  return (
    <section className="movies-list">
      <ul className="movies-list__cards">
        {moviesList.map((movie, i) => (
          <MoviesCard
            key={location.pathname === "/movies" ? movie.id : movie.movieId}
            movie={movie}
            onSaveClick={onSaveClick}
            onDeleteClick={onDeleteClick}
            savedMovies={savedMovies}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
