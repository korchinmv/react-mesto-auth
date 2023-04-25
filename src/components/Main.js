import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  openConfirmPopup,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="container">
          <div className="profile__inner">
            <div className="profile__info">
              <button
                className="profile__avatar-btn"
                type="button"
                onClick={onEditAvatar}
              >
                <img
                  className="profile__avatar"
                  src={currentUser.avatar}
                  alt="Аватар"
                />
              </button>

              <div className="profile__content">
                <div className="profile__content-box">
                  <h1 className="profile__name">{currentUser.name}</h1>

                  <button
                    className="profile__edit hover"
                    type="button"
                    aria-label="Редактировать профиль"
                    onClick={onEditProfile}
                  />
                </div>

                <p className="profile__profession">{currentUser.about}</p>
              </div>
            </div>

            <button
              className="profile__add hover"
              type="button"
              aria-label="Добавить место"
              onClick={onAddPlace}
            />
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <ul className="gallery__list">
            {cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardLike={onCardLike}
                onCardClick={onCardClick}
                openConfirmPopup={openConfirmPopup}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Main;
