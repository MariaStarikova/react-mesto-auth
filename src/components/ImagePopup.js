function ImagePopup(props) {
  const { card } = props;

  return (
    <div className={`popup popup_image ${card ? 'popup_opened' : ''}`} id="popup-view">
      <div className="popup__container popup__container_image">
        <button
          type="button"
          className="popup__close-button popup__close-button_view"
          onClick={props.onClose}
        ></button>
        <img className="popup__image" alt="Увеличенное изображение" src={card ? card.link : ''} />
        <h2 className="popup__title-image">Заголовок изображения</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
