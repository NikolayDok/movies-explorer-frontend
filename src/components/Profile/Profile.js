import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const signOut = () => {
    navigate("/", { replace: true });
  };

  return (
    <main className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form">
        <fieldset className="profile__fieldset">
          <label className="profile__input-label">
            <p className="profile__input-text">Имя</p>
            <input
              className="profile__input"
              type="text"
              name="name"
              placeholder="Имя"
              value={"Виталий"}
              required
            />
          </label>
          <span className="profile__line"></span>
          <label className="profile__input-label">
            <p className="profile__input-text">E-mail</p>
            <input
              className="profile__input"
              type="email"
              name="email"
              value={"pochta@yandex.ru"}
              placeholder="E-mail"
              required
            />
          </label>
        </fieldset>
        <div className="profile__edit">
          <button className="profile__btn-edit" type="submit">
            Редактировать
          </button>
          <button className="profile__btn-signin" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
