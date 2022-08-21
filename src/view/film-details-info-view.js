import { createElement } from '../render.js';

const createFilmDetailsInfo = (film) => {
  /**
   * Function that return genres markup
   * @param {*} genres - genres data
   * @returns genres markup
   */
  const getGenres = (genres) =>
    genres
      .split(',')
      .map((genre) => `<span class="film-details__genre">${genre}</span>`)
      .join('');

  return `
<div class="film-details__top-container">
  <div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>
  <div class="film-details__info-wrap">
    <div class="film-details__poster">
      <img class="film-details__poster-img" src="${film.filmInfo.poster}" alt="">

      <p class="film-details__age">${film.filmInfo.ageRating} +</p>
    </div>

    <div class="film-details__info">
      <div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${film.filmInfo.title}</h3>
          <p class="film-details__title-original">Original: ${film.filmInfo.alternativeTitle}</p>
        </div>

        <div class="film-details__rating">
          <p class="film-details__total-rating">${film.filmInfo.totalRating}</p>
        </div>
      </div>

      <table class="film-details__table">
        <tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${film.filmInfo.director}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Writers</td>
          <td class="film-details__cell">${film.filmInfo.writers}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Actors</td>
          <td class="film-details__cell">${film.filmInfo.actors}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${film.filmInfo.release.date}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${film.filmInfo.runtime}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${film.filmInfo.release.releaseCountry}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Genres</td>
          <td class="film-details__cell">
          ${getGenres(film.filmInfo.genre)}
        </tr>
      </table>

      <p class="film-details__film-description">
        ${film.filmInfo.description}
      </p>
    </div>
  </div>
</div>`;
};

export default class FilmDetailsInfoView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmDetailsInfo(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
