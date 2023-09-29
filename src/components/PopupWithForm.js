function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <form className="popup__form popup__form_add-card" name={props.name} noValidate>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
        </form>
        <button
          type="button"
          className="popup__close-button popup__close-button_add"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

const PopupEditProfile = () => {
  return (
    <>
      <input
        id="input-title"
        name="input-title"
        type="text"
        className="popup__input popup__input_title"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error input-title-error"></span>
      <input
        id="input-description"
        name="input-description"
        type="text"
        className="popup__input popup__input_subtitle"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error input-description-error"></span>
      <button type="submit" className="popup__button" aria-label="Сохранить">
        Сохранить
      </button>
    </>
  );
};

const PopupAddPlace = () => {
  return (
    <>
      <input
        id="input-name"
        name="input-name"
        type="text"
        className="popup__input popup__input_mesto"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error input-name-error"></span>
      <input
        id="input-link"
        name="input-link"
        type="url"
        className="popup__input popup__input_image"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error input-link-error"></span>
      <button type="submit" className="popup__button" aria-label="Сохранить">
        Сохранить
      </button>
    </>
  );
};

const PopupRemove = () => {
  return (
    <>
      <button type="submit" className="popup__button popup__button_remove" aria-label="Сохранить">
        Да
      </button>
    </>
  );
};

const PopupEditAvatar = () => {
  return (
    <>
      <input
        id="input-avatar"
        name="input-avatar"
        type="url"
        className="popup__input popup__input_avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error input-avatar-error"></span>
      <button type="submit" className="popup__button" aria-label="Сохранить">
        Сохранить
      </button>
    </>
  );
};

export { PopupWithForm, PopupEditProfile, PopupAddPlace, PopupRemove, PopupEditAvatar };
