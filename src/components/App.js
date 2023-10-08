import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { PopupWithForm, PopupRemove } from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInfoUser()
      .then(userInfo => {
        setCurrentUser({
          name: userInfo.name,
          about: userInfo.about,
          avatar: userInfo.avatar,
          id: userInfo._id
        });
        // setCurrentUser({ userInfo });
        // setCurrentUser({ name, about, avatar });
        console.log(userInfo);
      })
      .catch(error => {
        console.error(`Ошибка при получении данных: ${error}`);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then(cardsData => {
        // console.log('cardsData:', cardsData);
        setCards(cardsData);
      })
      .catch(error => {
        console.error(`Ошибка при получении данных: ${error}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser.id);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then(newCard => {
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
        })
        .catch(err => {
          console.error(`Ошибка: ${err}`);
        });
      return;
    } else {
      api
        .removeLike(card._id)
        .then(newCard => {
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
        })
        .catch(err => {
          console.error(`Ошибка: ${err}`);
        });
      return;
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id));
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    // console.log(card);
    // console.log(handleCardClick);
  }

  function closeAllPopups() {
    // console.log('Попапы закрыты');
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(user) {
    api
      .updateUserInfo(user)
      .then(user => setCurrentUser(user))
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateUserAvatar(data)
      .then(data => setCurrentUser(data))
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .catch(err => console.log(err))
      .finally(() => {
        closeAllPopups();
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          setCards={setCards}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm title="Вы уверены?" name="remove" onClose={closeAllPopups}>
          <PopupRemove />
        </PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
