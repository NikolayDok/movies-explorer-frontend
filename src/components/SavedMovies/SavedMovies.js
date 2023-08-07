import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({
  savedMoviesList,
  formatTime,
  onDeleteClick,
  setSearchFilms,
  isShortFilms,
  setIsShortFilms,
  searchFilmsValue,
  setSearchFilmsValue,
}) {
  const searchMovieClick = (searchFilmsValue) => {
    setSearchFilms(searchFilmsValue);
  };

  return (
    <main className="saved-movies">
      <SearchForm
        setSearchFilmsValue={setSearchFilmsValue}
        searchFilmsValue={searchFilmsValue}
        isShortFilms={isShortFilms}
        setIsShortFilms={setIsShortFilms}
        searchMovieClick={searchMovieClick}
      />
      {!savedMoviesList ? null : (
        <MoviesCardList
          moviesList={savedMoviesList}
          formatTime={formatTime}
          onDeleteClick={onDeleteClick}
        />
      )}
    </main>
  );
}

export default SavedMovies;
