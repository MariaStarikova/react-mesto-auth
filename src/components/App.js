import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CardDeletePopup from './CardDeletePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);

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

  function handleCardDelete() {
    api
      .deleteCard(selectedCardToDelete._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== selectedCardToDelete._id));
        closeAllPopups();
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

  function handleDeleteClick(card) {
    // console.log(card);
    setIsCardDeletePopupOpen(true);
    setSelectedCardToDelete(card);
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
    setIsCardDeletePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(user) {
    api
      .updateUserInfo(user)
      .then(updatedFields => {
        setCurrentUser(prevUser => ({
          ...prevUser,
          name: updatedFields.name || prevUser.name,
          about: updatedFields.about || prevUser.about
        }));
        closeAllPopups();
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateUserAvatar(data)
      .then(updatedData => {
        setCurrentUser(prevUser => ({
          ...prevUser,
          avatar: updatedData.avatar || prevUser.avatar
        }));
        closeAllPopups();
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
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
          onDeleteClick={handleDeleteClick}
          onCardLike={handleCardLike}
          cards={cards}
          setCards={setCards}
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
        <CardDeletePopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={() => handleCardDelete(selectedCardToDelete)}
        />
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
