import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

import movieImg1 from "../../images/movie-img_1.jpg";
import movieImg2 from "../../images/movie-img_2.jpg";
import movieImg3 from "../../images/movie-img_3.jpg";
import movieImg4 from "../../images/movie-img_4.jpg";
import movieImg5 from "../../images/movie-img_5.jpg";
import movieImg6 from "../../images/movie-img_6.jpg";
import movieImg7 from "../../images/movie-img_7.jpg";
import movieImg8 from "../../images/movie-img_8.jpg";
import movieImg9 from "../../images/movie-img_9.jpg";
import movieImg10 from "../../images/movie-img_10.jpg";
import movieImg11 from "../../images/movie-img_11.jpg";
import movieImg12 from "../../images/movie-img_12.jpg";
import movieImg13 from "../../images/movie-img_13.jpg";
import movieImg14 from "../../images/movie-img_14.jpg";
import movieImg15 from "../../images/movie-img_15.jpg";
import movieImg16 from "../../images/movie-img_16.jpg";

import Preloader from "./Preloader/Preloader";

function Movies() {
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
    {
      image: movieImg4,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg5,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg6,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
      owner: "user",
    },
    {
      image: movieImg7,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg8,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg9,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg10,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg11,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg12,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg13,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg14,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg15,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      image: movieImg16,
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

export default Movies;
