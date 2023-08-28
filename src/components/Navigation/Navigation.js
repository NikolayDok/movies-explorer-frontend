import "./Navigation.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  const [burgerActive, setBurgerActive] = React.useState(false);

  const handleToggleBurger = () => {
    setBurgerActive(!burgerActive);
  };

  return (
    <nav className="navigation">
      <button
        className={`navigation__burger ${
          burgerActive ? "navigation__burger_active" : ""
        }`}
        onClick={handleToggleBurger}
        type="button"
      >
        <span className="navigation__burger-item"></span>
      </button>
      <div
        className={`navigation__links ${
          burgerActive ? "navigation__links_active" : ""
        }`}
      >
        <div className="navigation__movies-menu">
          <NavLink
            to="/"
            className="navigation__movies-link"
            onClick={handleToggleBurger}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              "navigation__movies-link" +
              (isActive ? " navigation__movies-link_active" : "")
            }
            onClick={handleToggleBurger}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              "navigation__movies-link" +
              (isActive ? " navigation__movies-link_active" : "")
            }
            onClick={handleToggleBurger}
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink
          to="/profile"
          className="navigation__account-btn"
          onClick={handleToggleBurger}
        >
          Аккаунт
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
