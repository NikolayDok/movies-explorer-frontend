import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

import Preloader from "./Preloader/Preloader";

function Movies({
  films,
  searchFilms,
  setSearchFilms,
  searchFilmsValue,
  setSearchFilmsValue,
  isShortFilms,
  setIsShortFilms,
  windowSize,
  isWaitingFilms,
  searchConnectError,
  formatTime,
  onSaveClick,
  savedMovies,
}) {
  const searchMovieClick = (searchFilmsValue) => {
    setSearchFilms(searchFilmsValue);
  };

  const [counterMovies, setCounterMovies] = React.useState(0);

  const moviesCards = React.useCallback(() => {
    if (windowSize >= 1280) {
      setCounterMovies(16);
    } else if (windowSize >= 1001) {
      setCounterMovies(12);
    } else if (windowSize >= 768) {
      setCounterMovies(8);
    } else {
      setCounterMovies(5);
    }
  }, [windowSize]);

  React.useEffect(() => {
    if (searchFilms.length > 0) {
      moviesCards();
    }
  }, [searchFilms, isShortFilms, moviesCards]);

  const showMoreMovies = () => {
    if (windowSize >= 1280) {
      setCounterMovies(counterMovies + 4);
    } else if (windowSize >= 1001) {
      setCounterMovies(counterMovies + 3);
    } else if (windowSize >= 768) {
      setCounterMovies(counterMovies + 2);
    } else {
      setCounterMovies(counterMovies + 1);
    }
  };

  const showMoreBtn = () => {
    if (films === null || searchFilms.length === 0) {
      return false;
    }

    if (counterMovies >= films.length) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <main className="movies">
      <SearchForm
        searchFilmsValue={searchFilmsValue}
        setSearchFilmsValue={setSearchFilmsValue}
        isShortFilms={isShortFilms}
        setIsShortFilms={setIsShortFilms}
        searchMovieClick={searchMovieClick}
      />
      {searchConnectError ? (
        <p className="movies__search-connect-error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      ) : (
        ""
      )}
      {!films ? null : isWaitingFilms ? (
        <Preloader />
      ) : films.length > 0 ? (
        <MoviesCardList
          formatTime={formatTime}
          onSaveClick={onSaveClick}
          savedMovies={savedMovies}
          moviesList={films.slice(0, counterMovies)}
        />
      ) : (
        <span className="movies__not-found">Ничего не найдено</span>
      )}

      {showMoreBtn() && (
        <div className="movies__btn-more-container">
          <button
            type="button"
            onClick={showMoreMovies}
            aria-label="Загрузить еще"
            className="movies__btn-more"
          >
            Ещё
          </button>
        </div>
      )}
    </main>
  );
}

export default Movies;
