import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn, registrationLink, login, main }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={logo} alt="Логотип" className="header__logo" />
      </Link>
      {loggedIn ? (
        <>
          <nav className="header__nav">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                "header__movies-link" +
                (isActive ? " header__movies-link_active" : "")
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                "header__movies-link" +
                (isActive ? " header__movies-link_active" : "")
              }
            >
              Сохранённые фильмы
            </NavLink>
          </nav>
          <Link to="/profile" className="header__account-btn">
            Аккаунт
          </Link>
          <Navigation />
        </>
      ) : (
        <>
          <nav className="header__auth-container">
            <Link to={registrationLink} className="header__registration-btn">
              Регистрация
            </Link>
            <Link to={login} className="header__login-btn">
              Войти
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}

export default Header;
