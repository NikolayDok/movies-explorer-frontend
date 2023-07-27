import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Register.css";

function Register() {
  return (
    <section className="register">
      <Link to="/">
        <img src={logo} alt="Логотип" className="register__logo" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <fieldset className="register__fieldset">
          <label className="register__input-label">
            <span className="register__input-text">Имя</span>
            <input
              className="register__input"
              type="text"
              name="name"
              placeholder="Имя"
              defaultValue="Виталий"
              minLength={2}
              maxLength={30}
              required
            />
            <span className="register__validate-error"></span>
          </label>
          <label className="register__input-label">
            <span className="register__input-text">E-mail</span>
            <input
              className="register__input"
              type="email"
              name="email"
              defaultValue="pochta@yandex.ru"
              placeholder="Email"
              required
            />
            <span className="register__validate-error"></span>
          </label>
          <label className="register__input-label">
            <span className="register__input-text">Пароль</span>
            <input
              className="register__input register__input_error"
              type="password"
              name="password"
              defaultValue="••••••••••••••"
              placeholder="Пароль"
              minLength={6}
              maxLength={30}
              required
            />
            <span className="register__validate-error">
              Что-то пошло не так...
            </span>
          </label>
        </fieldset>
        <div className="register__edit">
          <button className="register__btn-edit" type="submit">
            Зарегистрироваться
          </button>
          <div className="register__question">
            <p className="register__question-text">Уже зарегистрированы?</p>
            <Link to="/signin" className="register__btn-signin">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Register;
