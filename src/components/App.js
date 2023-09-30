import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {
  PopupWithForm,
  PopupEditProfile,
  PopupAddPlace,
  PopupRemove,
  PopupEditAvatar
} from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
    console.log(card);
    // console.log(handleCardClick);
  }

  function closeAllPopups() {
    // console.log('Попапы закрыты');
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page__content">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <PopupEditProfile />
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="add"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <PopupAddPlace />
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="remove" onClose={closeAllPopups}>
        <PopupRemove />
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="update"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <PopupEditAvatar />
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
