import { formatValueToYear } from '../util.js';
import { MAX_DESCRIPTION_LENGHT } from '../const.js';
import { createElement } from '../render.js';

const createFilmCardTemplate = (film) => {
  /**
   * Function that cut text velue to definite length
   * @param {*} description - total text value
   * @returns cutted or uncuted text value
   */
  const showDescription = (description) =>
    description.length > MAX_DESCRIPTION_LENGHT ? `${description.slice(0, MAX_DESCRIPTION_LENGHT)} ...` : description;

  /**
   * Function that add active class to buttons
   * @param {*} isChecked - boolean value
   * @returns active class
   */
  const getActive = (isChecked) => isChecked && 'film-card__controls-item--active';

  return `
<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${film.filmInfo.title}</h3>
    <p class="film-card__rating">${film.filmInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${formatValueToYear(film.filmInfo.release.date)}</span>
      <span class="film-card__duration">${film.filmInfo.runtime}</span>
      <span class="film-card__genre">${film.filmInfo.genre}</span>
    </p>
    <img src="${film.filmInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${showDescription(film.filmInfo.description)}</p>
    <span class="film-card__comments">${film.comments.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist 
    ${getActive(film.userDetails.watchlist)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched 
    ${getActive(film.userDetails.alreadyWatched)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite 
    ${getActive(film.userDetails.favorite)}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
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
