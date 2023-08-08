import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./App.css";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";

import mainApi from "../../utils/MainApi";
import movApi from "../../utils/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false,
  );

  const [films, setFilms] = useState(null);
  const [searchFilms, setSearchFilms] = useState(
    localStorage.getItem("searchFilms") || "",
  );
  const [isShortFilms, setIsShortFilms] = useState(
    JSON.parse(localStorage.getItem("isShortFilms")) || false,
  );
  const [searchFilmsValue, setSearchFilmsValue] = useState(
    localStorage.getItem("searchFilms") || "",
  );

  const [savedMovies, setSavedMovies] = useState(null);
  const [searchSavedMovies, setSearchSavedMovies] = useState("");
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
  const [searchSavedMoviesValue, setSearchSavedMoviesValue] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [searchConnectError, setSearchConnectError] = useState(false);

  const [isWaitingFilms, setIsWaitingFilms] = useState(false);
  const [isTaking, setIsTaking] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const [isConflictMessage, setIsConflictMessage] = useState("");

  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (
      loggedIn &&
      (location.pathname === "/signin" || location.pathname === "signup")
    ) {
      navigate("/");
    }
  }, [loggedIn]);

  const handleResize = useCallback(() => {
    setTimeout(() => setWindowSize(window.innerWidth), 100);
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (!films && searchFilms.length > 0) {
      setIsWaitingFilms(true);
      movApi
        .getMovies()
        .then((films) => {
          setFilms(films);
          localStorage.setItem("films", JSON.stringify(films));
        })
        .catch((err) => setSearchConnectError(true))
        .finally(() => setIsWaitingFilms(false));
    }
  }, [films, searchFilms, loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("searchFilms", searchFilms);
      localStorage.setItem("isShortFilms", JSON.stringify(isShortFilms));
    }
  }, [loggedIn, searchFilms, isShortFilms]);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getSavedFilms(token);
    }
  }, [loggedIn]);

  const handleIsLogged = () => {
    setLoggedIn(true);
  };

  const findMovies = useCallback((movies, searchQuery, isShort) => {
    if (!movies) {
      return null;
    }

    return movies.filter((movie) => {
      return (
        (isShort ? movie.duration < 40 : movie) &&
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  });

  const findFilms = findMovies(films, searchFilms, isShortFilms);

  const getToken = useCallback(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      mainApi
        .getToken(jwt)
        .then((data) => {
          if (data) {
            const { _id, name, email } = data;
            setCurrentUser({ _id, name, email });
            handleIsLogged();
            localStorage.setItem("loggedIn", JSON.stringify(true));
          }
        })
        .catch((err) => {
          console.log("getToken error: " + err);
        });
    }
  }, []);

  const handleRegister = (name, email, password) => {
    setIsTaking(true);

    mainApi
      .signup(name, email, password)
      .then((data) => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log("signup error: " + err);

        if (err === 409) {
          setIsConflictMessage("Пользователь с таким Email уже существует");
        }
      })
      .finally(() => setIsTaking(false));
  };

  const handleLogin = (email, password) => {
    setIsTaking(true);

    mainApi
      .signin(email, password)
      .then((data) => {
        if (data.token) {
          handleIsLogged();
          getToken();
          setToken(data.token);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setIsConflictMessage("");

        console.log("signin error: " + err);

        if (err === 401) {
          setIsConflictMessage("Неверно введен Email или пароль");
        }
      })
      .finally(() => setIsTaking(false));
  };

  const getSavedFilms = (token) => {
    mainApi
      .getSavedMovies(token)
      .then((films) => setSavedMovies(films))
      .catch((err) => console.log(err));
  };

  const handleEditProfile = (name, email) => {
    setIsTaking(true);

    mainApi
      .setUserInfo(name, email, token)
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          email: userData.email,
        });

        setIsConflictMessage("");
      })
      .catch((err) => {
        console.log("setUserInfo error: " + err);
      })
      .finally(() => setIsTaking(false));
  };

  const handleSaveClick = (movie) => {
    const isMovieSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (!isMovieSaved) {
      mainApi
        .createMovies(
          {
            movieId: movie.id,
            nameRU: movie.nameRU,
            image: "https://api.nomoreparties.co" + movie.image.url,
            trailerLink: movie.trailerLink,
            duration: movie.duration,
            country: movie.country,
            director: movie.director,
            year: movie.year,
            description: movie.description,
            thumbnail:
              "https://api.nomoreparties.co" +
              movie.image.formats.thumbnail.url,
            owner: movie.owner,
            nameEN: movie.nameEN,
          },
          token,
        )
        .then((movie) => setSavedMovies([movie, ...savedMovies]))
        .catch((err) => console.log(err, err.status, err.message));
    } else {
      const movieId = savedMovies.find((item) => item.movieId === movie.id)._id;
      mainApi
        .deleteSavedMovie(movieId, token)
        .then(() => {
          setSavedMovies((stat) =>
            stat.filter((item) => item.movieId !== movie.id),
          );
        })
        .catch((err) => console.log("deleteSavedMovie error: " + err));
    }
  };

  const findSavedMovies = findMovies(
    savedMovies,
    searchSavedMovies,
    isShortSavedMovies,
  );

  const handleDeleteClick = (movie) => {
    mainApi
      .deleteSavedMovie(movie._id, token)
      .then(() => {
        setSavedMovies((stat) =>
          stat.filter((item) => item.movieId !== movie.movieId),
        );
      })
      .catch((err) => console.log("deleteSavedMovie error: " + err));
  };

  const signOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setFilms(null);
    setSearchFilms("");
    setIsShortFilms(false);
    setSearchFilmsValue("");
    setSavedMovies(null);
    setSearchSavedMovies("");
    setIsShortSavedMovies(false);
    setSearchSavedMoviesValue("");
    setIsConflictMessage("");
    setCurrentUser({
      _id: "",
      name: "",
      email: "",
    });
    navigate("/", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        {(location.pathname === "/" ||
          location.pathname === "/movies" ||
          location.pathname === "/saved-movies" ||
          location.pathname === "/profile") && <Header loggedIn={loggedIn} />}

        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route
            exact
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                films={findFilms}
                searchFilms={searchFilms}
                setSearchFilms={setSearchFilms}
                searchFilmsValue={searchFilmsValue}
                setSearchFilmsValue={setSearchFilmsValue}
                isShortFilms={isShortFilms}
                setIsShortFilms={setIsShortFilms}
                isWaitingFilms={isWaitingFilms}
                searchConnectError={searchConnectError}
                savedMovies={savedMovies}
                onSaveClick={handleSaveClick}
                windowSize={windowSize}
              />
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMoviesList={findSavedMovies}
                searchFilms={searchSavedMovies}
                setSearchFilms={setSearchSavedMovies}
                searchFilmsValue={searchSavedMoviesValue}
                setSearchFilmsValue={setSearchSavedMoviesValue}
                isShortFilms={isShortSavedMovies}
                setIsShortFilms={setIsShortSavedMovies}
                onDeleteClick={handleDeleteClick}
              />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                signOut={signOut}
                handleEditProfile={handleEditProfile}
                isTaking={isTaking}
              />
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
                isTaking={isTaking}
                isConflictMessage={isConflictMessage}
              />
            }
          />
          <Route
            exact
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                isTaking={isTaking}
                isConflictMessage={isConflictMessage}
              />
            }
          />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
        {(location.pathname === "/" ||
          location.pathname === "/movies" ||
          location.pathname === "/saved-movies") && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
