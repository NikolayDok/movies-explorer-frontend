import React, { useState } from "react";

import "./SearchForm.css";

function SearchForm({
  searchFilmsValue,
  setSearchFilmsValue,
  isShortFilms,
  setIsShortFilms,
  searchMovieClick,
}) {
  const [searchFilmsValueError, setSearchFilmsValueError] = useState(false);

  const handleSearchFilmsValue = (e) => {
    setSearchFilmsValue(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (!searchFilmsValue) {
      setSearchFilmsValueError(true);
    } else {
      searchMovieClick(searchFilmsValue);
      setSearchFilmsValueError(false);
    }
  };

  const handleCheckbox = () => {
    setIsShortFilms(!isShortFilms);
  };

  return (
    <section>
      <form className="search-form" onSubmit={handleSubmitSearch} noValidate>
        <div className="search-form__container">
          <input
            type="text"
            id="search-input-name"
            name="search-movies"
            placeholder="Фильм"
            className="search-form__input"
            value={searchFilmsValue}
            onChange={handleSearchFilmsValue}
          />

          {searchFilmsValueError && (
            <span className="search-form__error">
              Нужно ввести ключевое слово
            </span>
          )}

          <button type="submit" className="search-form__submit-btn">
            Поиск
          </button>
        </div>
        <div className="search-form__checkbox-container">
          <label className="search-form__checkbox-label">
            <input
              type="checkbox"
              name="short-film-checkbox"
              id="short-film-checkbox"
              className="search-form__checkbox"
              checked={isShortFilms}
              onChange={handleCheckbox}
            />
            <span className="search-form__custom-checkbox"></span>
            Короткометражки
          </label>
        </div>
        <span className="search-form__border-bottom"></span>
      </form>
    </section>
  );
}

export default SearchForm;
