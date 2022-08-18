import { createElement } from '../render.js';

const createFilmDetailsControls = (film) => {
  /**
   * Function that add active class to buttons
   * @param {*} isChecked - boolean value
   * @returns active class
   */
  const getActive = (isChecked) => isChecked && 'film-details__control-button--active';

  return `<section class="film-details__controls">
    <button type="button" class="film-details__control-button film-details__control-button--watchlist 
    ${getActive(film.userDetails.watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button film-details__control-button--watched 
    ${getActive(film.userDetails.alreadyWatched)}" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button film-details__control-button--favorite 
    ${getActive(film.userDetails.favorite)}" id="favorite" name="favorite">Add to favorites</button>
  </section>`;
};

export default class FilmDetailsControlsView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmDetailsControls(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
