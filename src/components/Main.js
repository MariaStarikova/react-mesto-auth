import profileAvatar from '../images/avatar.svg';

function Main() {
  function handleEditProfileClick() {
    document.querySelector('.popup_edit-profile').classList.add('popup_opened');
  }

  function handleAddPlaceClick() {
    document.querySelector('.popup_add-card').classList.add('popup_opened');
  }

  // function handleEditAvatarClick() {
  //   document.querySelector('.popup_update-avatar').classList.add('popup_opened');
  // }

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <img className="profile__avatar" alt="Фото профиля" src={profileAvatar} />
          <button
            type="button"
            className="profile__button-avatar"
            aria-label="Редактировать фото"
            onClick={handleEditAvatarClick}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">Жак-Ив Кусто</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать"
              onClick={handleEditProfileClick}
            ></button>
          </div>
          <p className="profile__subtitle">Исследователь океана</p>
        </div>
        <button
          type="submit"
          className="profile__add-button"
          aria-label="Добавить контент"
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list"></ul>
      </section>
    </main>
  );
}

export default Main;
