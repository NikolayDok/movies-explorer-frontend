import React from "react";
import { Link } from "react-router-dom";
import { useFormValidation } from "../hooks/useFormValidation";
import logo from "../../images/logo.svg";
import "./Register.css";

function Register({ handleRegister, isTaking, isConflictMessage }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, password } = values;
    handleRegister(name, email, password);
  };

  return (
    <section className="register">
      <Link to="/">
        <img src={logo} alt="Логотип" className="register__logo" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <fieldset className="register__fieldset">
          <label className="register__input-label">
            <span className="register__input-text">Имя</span>
            <input
              className={`register__input ${
                errors.name && "register__input_error"
              }`}
              type="name"
              name="name"
              placeholder=""
              minLength={2}
              maxLength={30}
              value={values.name || ""}
              onChange={handleChange}
              required
            />
            <span className="register__validate-error">
              {errors.name || ""}
            </span>
          </label>
          <label className="register__input-label">
            <span className="register__input-text">E-mail</span>
            <input
              className={`register__input ${
                errors.email && "register__input_error"
              }`}
              type="email"
              name="email"
              placeholder=""
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              value={values.email || ""}
              onChange={handleChange}
              required
            />
            <span className="register__validate-error">
              {errors.email || ""}
            </span>
          </label>
          <label className="register__input-label">
            <span className="register__input-text">Пароль</span>
            <input
              className={`register__input ${
                errors.password && "register__input_error"
              }`}
              type="password"
              name="password"
              placeholder=""
              minLength={6}
              maxLength={30}
              value={values.password || ""}
              onChange={handleChange}
              required
            />
            <span className="register__validate-error">
              {errors.password || ""}
            </span>
          </label>
        </fieldset>
        <div className="register__edit">
          <span className="register__validate-error">{isConflictMessage}</span>
          <button
            disabled={!isValid || isTaking}
            className={`register__btn-edit ${
              !isValid && "register__btn-edit_disabled"
            }`}
            type="submit"
          >
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
