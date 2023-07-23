import React from "react";
import "./SearchForm.css";

function SearchForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-form__container">
        <input
          type="text"
          name="search-movies"
          placeholder="Фильм"
          className="search-form__input"
          required
        />

        <button type="submit" className="search-form__submit-btn">
          Поиск
        </button>
      </label>
      <div className="search-form__checkbox-container">
        <label className="search-form__checkbox-label">
          <input
            type="checkbox"
            name="short-film-checkbox"
            id="short-film-checkbox"
            className="search-form__checkbox"
          />
          <span className="search-form__custom-checkbox"></span>
          Короткометражки
        </label>
      </div>
      <span className="search-form__border-bottom"></span>
    </form>
  );
}

export default SearchForm;
