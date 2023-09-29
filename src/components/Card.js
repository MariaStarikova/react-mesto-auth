function Card({ onCardClick, card }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="element">
      <button type="button" className="element__button-remove" aria-label="Удалить"></button>
      <img src={card.link} className="element__image" alt={card.name} onClick={handleClick} />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button type="button" className="element__button-like" aria-label="Нравиться"></button>
          <span className="element__like-number"></span>
        </div>
      </div>
    </div>
  );
}

export default Card;
