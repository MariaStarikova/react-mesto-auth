import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <div className="page__content">
      <Header />
      <Main />
      <Footer />
      <div className="popup popup_edit-profile">
        <div className="popup__container">
          <form className="popup__form" name="edit" novalidate>
            <h2 className="popup__title">Редактировать профиль</h2>
            <input
              id="input-title"
              name="input-title"
              type="text"
              className="popup__input popup__input_title"
              placeholder="Имя"
              minlength="2"
              maxlength="40"
              required
            />
            <span className="popup__input-error input-title-error"></span>
            <input
              id="input-description"
              name="input-description"
              type="text"
              className="popup__input popup__input_subtitle"
              placeholder="Описание"
              minlength="2"
              maxlength="200"
              required
            />
            <span className="popup__input-error input-description-error"></span>
            <button type="submit" className="popup__button" aria-label="Сохранить">
              Сохранить
            </button>
          </form>
          <button
            type="button"
            className="popup__close-button popup__close-button_edit"
            aria-label="Закрыть"
          ></button>
        </div>
      </div>

      <div className="popup popup_add-card">
        <div className="popup__container">
          <form className="popup__form popup__form_add-card" name="add" novalidate>
            <h2 className="popup__title">Новое место</h2>
            <input
              id="input-name"
              name="input-name"
              type="text"
              className="popup__input popup__input_mesto"
              placeholder="Название"
              minlength="2"
              maxlength="30"
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
          </form>
          <button
            type="button"
            className="popup__close-button popup__close-button_add"
            aria-label="Закрыть"
          ></button>
        </div>
      </div>

      <div className="popup popup_image" id="popup-view">
        <div className="popup__container popup__container_image">
          <button type="button" className="popup__close-button popup__close-button_view"></button>
          <img className="popup__image" alt="Увеличенное изображение" />
          <h2 className="popup__title-image">Заголовок изображения</h2>
        </div>
      </div>

      <div className="popup popup_remove">
        <div className="popup__container">
          <div className="popup__form">
            <h2 className="popup__title popup__title_remove">Вы уверены?</h2>
            <button
              type="submit"
              className="popup__button popup__button_remove"
              aria-label="Сохранить"
            >
              Да
            </button>
          </div>
          <button type="button" className="popup__close-button" aria-label="Закрыть"></button>
        </div>
      </div>

      <div className="popup popup_update-avatar">
        <div className="popup__container">
          <form className="popup__form popup__form_avatar">
            <h2 className="popup__title">Обновить аватар</h2>
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
          </form>
          <button type="button" className="popup__close-button" aria-label="Закрыть"></button>
        </div>
      </div>

      <template id="template-element">
        <div className="element">
          <button type="button" className="element__button-remove" aria-label="Удалить"></button>
          <img src="./images/wilderness.jpg" className="element__image" alt="Картинка" />
          <div className="element__description">
            <h2 className="element__title">Текст поста</h2>
            <div className="element__likes">
              <button
                type="button"
                className="element__button-like"
                aria-label="Нравиться"
              ></button>
              <span className="element__like-number"></span>
            </div>
          </div>
        </div>
      </template>
    </div>
  );
}

export default App;
