import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import saveMovieBtnActive from "../../../images/card-button_active.svg";
import saveMovieBtnDisabled from "../../../images/card-button_disabled.svg";
import deleteMovieBtn from "../../../images/card-button_delete.svg";

function MoviesCard({ movie, onSaveClick, onDeleteClick, savedMovies }) {
  const location = useLocation();

  const isSaved = savedMovies
    ? savedMovies.some((item) => item.movieId === movie.id)
    : false;

  const handleSaveClick = () => {
    onSaveClick(movie);
  };

  const handleDeleteClick = () => {
    onDeleteClick(movie);
  };

  return (
    <li className="movies-card">
      <a
        href={movie.trailerLink}
        target="_blank"
        className="movies-card__movies-link"
        rel="noreferrer"
      >
        {location.pathname === "/movies" ? (
          <img
            className="movies-card__image"
            src={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
            alt="Превью фильма"
          />
        ) : (
          <img
            className="movies-card__image"
            src={movie.thumbnail}
            alt="Превью фильма"
          />
        )}
      </a>
      <div className="movies-card__container">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__duration">
            {Math.floor(movie.duration / 60) || "0"}ч {movie.duration % 60}м
          </p>
        </div>
        {location.pathname === "/movies" && (
          <button
            type="button"
            aria-label="Добавить в сохраненные"
            className="movies-card__btn"
            onClick={handleSaveClick}
          >
            {isSaved ? (
              <img
                className="movies-card__save-btn"
                alt="Добавлено в сохраненные"
                src={saveMovieBtnActive}
              />
            ) : (
              <img
                className="movies-card__save-btn"
                alt="добавить"
                src={saveMovieBtnDisabled}
              />
            )}
          </button>
        )}
        {location.pathname === "/saved-movies" && (
          <button
            type="button"
            aria-label="удалить фильм"
            className="movies-card__btn-delete"
            onClick={handleDeleteClick}
          >
            <img
              className="movies-сard__img-btn-delete"
              alt="Удалить"
              src={deleteMovieBtn}
            />
          </button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
