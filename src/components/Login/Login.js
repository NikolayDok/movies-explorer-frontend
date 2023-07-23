import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Login.css";

function Login() {
  return (
    <main className="login">
      <Link to="/">
        <img src={logo} alt="Логотип" className="login__logo" />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <fieldset className="login__fieldset">
          <label className="login__input-label">
            <p className="login__input-text">E-mail</p>
            <input
              className="login__input"
              type="email"
              name="email"
              value={"pochta@yandex.ru"}
              // placeholder="pochta@yandex.ru"
              required
            />
            <span className="login__validate-error"></span>
          </label>
          <label className="login__input-label">
            <p className="login__input-text">Пароль</p>
            <input
              className="login__input"
              type="password"
              name="password"
              // value=""
              placeholder=""
              required
            />
            <span className="login__validate-error"></span>
          </label>
        </fieldset>
        <div className="login__edit">
          <button className="login__btn-edit" type="submit">
            Войти
          </button>
          <div className="login__question">
            <p className="login__question-text">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="login__btn-signin">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Login;
