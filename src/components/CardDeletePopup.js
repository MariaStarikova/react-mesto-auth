import React from 'react';
import { PopupWithForm } from './PopupWithForm';

function CardDeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onCardDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="remove"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <button type="submit" className="popup__button popup__button_remove" aria-label="Сохранить">
        Да
      </button>
    </PopupWithForm>
  );
}

export default CardDeletePopup;
