import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

import movieImg1 from "../../images/movie-img_1.jpg";
import movieImg2 from "../../images/movie-img_2.jpg";
import movieImg3 from "../../images/movie-img_3.jpg";

import Preloader from "../Movies/Preloader/Preloader";

function SavedMovies() {
  const moviesList = [
    {
      image: movieImg1,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg2,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg3,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
  ];

  return (
    <main>
      <SearchForm />
      {moviesList.length !== 0 ? (
        <MoviesCardList moviesList={moviesList} />
      ) : (
        <Preloader />
      )}
    </main>
  );
}

export default SavedMovies;
