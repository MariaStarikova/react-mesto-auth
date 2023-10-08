function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <form
          className="popup__form popup__form_add-card"
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
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

const PopupRemove = () => {
  return (
    <>
      <button type="submit" className="popup__button popup__button_remove" aria-label="Сохранить">
        Да
      </button>
    </>
  );
};

export { PopupWithForm, PopupRemove };
