import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Register.css";

function Register() {
  return (
    <main className="register">
      <Link to="/">
        <img src={logo} alt="Логотип" className="register__logo" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <fieldset className="register__fieldset">
          <label className="register__input-label">
            <p className="register__input-text">Имя</p>
            <input
              className="register__input"
              type="text"
              name="name"
              // placeholder="Виталий"
              value={"Виталий"}
              required
            />
            <span className="register__validate-error"></span>
          </label>
          <label className="register__input-label">
            <p className="register__input-text">E-mail</p>
            <input
              className="register__input"
              type="email"
              name="email"
              value={"pochta@yandex.ru"}
              // placeholder="pochta@yandex.ru"
              required
            />
            <span className="register__validate-error"></span>
          </label>
          <label className="register__input-label">
            <p className="register__input-text">Пароль</p>
            <input
              className="register__input register__input_error"
              type="password"
              name="password"
              value={"••••••••••••••"}
              // placeholder="••••••••••••••"
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
    </main>
  );
}

export default Register;
