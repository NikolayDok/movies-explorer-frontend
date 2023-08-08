import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useFormValidation } from "../hooks/useFormValidation";

import "./Profile.css";

function Profile({
  signOut,
  handleEditProfile,
  isTaking,
  isConflictMessage,
  setIsConflictMessage,
  isProfileEditMessage,
}) {
  const { values, errors, isValid, handleChange, resetForm, setValues } =
    useFormValidation();

  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
    setIsConflictMessage("");
  }, [setValues, currentUser.name, currentUser.email, setIsConflictMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = values;
    handleEditProfile(name, email);
  };

  const isButtonAble =
    isValid &&
    (values.name !== currentUser.name || values.email !== currentUser.email) &&
    !isTaking;

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <fieldset className="profile__fieldset">
          <label className="profile__input-label">
            <span className="profile__input-text">Имя</span>
            <input
              className="profile__input"
              type="text"
              name="name"
              placeholder=""
              minLength={2}
              maxLength={30}
              value={values.name || ""}
              onChange={handleChange}
              required
            />
          </label>
          <span className="profile__line"></span>
          <span className="profile__validate-error">{errors.name || ""}</span>
          <label className="profile__input-label">
            <span className="profile__input-text">E-mail</span>
            <input
              className="profile__input"
              type="email"
              name="email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              placeholder=""
              value={values.email || ""}
              onChange={handleChange}
              required
            />
          </label>
          <span className="profile__line profile__line_transparent"></span>
          <span className="profile__validate-error">{errors.email || ""}</span>
        </fieldset>
        <div className="profile__edit">
          <span className="profile__edit-error">{isConflictMessage}</span>
          <span className="profile__edit-message">{isProfileEditMessage}</span>
          <button
            disabled={!isButtonAble}
            className={`profile__btn-edit ${
              !isButtonAble && "profile__btn-edit_disabled"
            }`}
            type="submit"
          >
            Редактировать
          </button>
          <button className="profile__btn-signin" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
