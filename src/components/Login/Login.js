import React from "react";
import { Link } from "react-router-dom";
import { useFormValidation } from "../hooks/useFormValidation";
import logo from "../../images/logo.svg";
import "./Login.css";

function Login({ handleLogin, isTaking, isConflictMessage }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = values;
    handleLogin(email, password);
  };

  return (
    <section className="login">
      <Link to="/">
        <img src={logo} alt="Логотип" className="login__logo" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__fieldset">
          <label className="login__input-label">
            <span className="login__input-text">E-mail</span>
            <input
              className={`login__input ${errors.email && "login__input_error"}`}
              type="email"
              name="email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              placeholder=""
              value={values.email || ""}
              onChange={handleChange}
              required
            />
            <span className="login__validate-error">{errors.email || ""}</span>
          </label>
          <label className="login__input-label">
            <span className="login__input-text">Пароль</span>
            <input
              className={`login__input ${
                errors.password && "login__input_error"
              }`}
              type="password"
              name="password"
              placeholder=""
              minLength={2}
              maxLength={30}
              value={values.password || ""}
              onChange={handleChange}
              required
            />
            <span className="login__validate-error">
              {errors.password || ""}
            </span>
          </label>
        </fieldset>
        <div className="login__edit">
          <span className="register__validate-error">{isConflictMessage}</span>
          <button
            disabled={!isValid || isTaking}
            className={`login__btn-edit ${
              !isValid && "login__btn-edit_disabled"
            }`}
            type="submit"
          >
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
