import FilmCardView from '../view/film-card-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class FilmPresenter {
  #filmsContainer = null;
  #controlButtonChange = null;
  #openPopup = null;
  #filmCardComponent = null;
  #film = null;

  constructor (filmsContainer, controlButtonChange, openPopup) {
    this.#filmsContainer = filmsContainer;
    this.#controlButtonChange = controlButtonChange;
    this.#openPopup = openPopup;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setOpenPopupButtonClickHandler(this.#openPopup);
    this.#filmCardComponent.setControlButtonClickHandler(this.#controlButtonChange);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmsContainer.element);
      return;
    }

    if (this.#filmsContainer.element.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  };

  setAborting = () => {
    const resetFilmFormState = () => {
      this.#filmCardComponent.updateElement({
        isDisabled: false,
      });
    };

    this.#filmCardComponent.shake(resetFilmFormState);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };
}
