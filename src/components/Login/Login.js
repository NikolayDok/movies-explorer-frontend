import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Login.css";

function Login() {
  return (
    <section className="login">
      <Link to="/">
        <img src={logo} alt="Логотип" className="login__logo" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <fieldset className="login__fieldset">
          <label className="login__input-label">
            <span className="login__input-text">E-mail</span>
            <input
              className="login__input"
              type="email"
              name="email"
              defaultValue="pochta@yandex.ru"
              placeholder="Email"
              required
            />
            <span className="login__validate-error"></span>
          </label>
          <label className="login__input-label">
            <span className="login__input-text">Пароль</span>
            <input
              className="login__input"
              type="password"
              name="password"
              placeholder=""
              minLength={2}
              maxLength={30}
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
    </section>
  );
}

export default Login;
