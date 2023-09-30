import React, { useEffect, useState } from 'react';
import profileAvatar from '../images/avatar.svg';
import { api } from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState(null);
  const [userDescription, setUserDescription] = useState(null);
  const [userAvatar, setUserAvatar] = useState(profileAvatar);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInfoUser()
      .then(userInfo => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      })
      .catch(error => {
        console.error(`Ошибка при получении данных: ${error}`);
      });
    api
      .getInitialCards()
      .then(cardsData => {
        console.log('cardsData:', cardsData);
        setCards(cardsData);
      })
      .catch(error => {
        console.error(`Ошибка при получении данных: ${error}`);
      });
  }, []);

  // console.log(props.onCardClick);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            alt="Фото профиля"
            src={userAvatar}
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
          <button
            type="button"
            className="profile__button-avatar"
            aria-label="Редактировать фото"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          type="submit"
          className="profile__add-button"
          aria-label="Добавить контент"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card, i) => (
            <li key={card._id}>
              <Card card={card} onCardClick={props.onCardClick} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
