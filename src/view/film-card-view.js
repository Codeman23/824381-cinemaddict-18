import { formatValueToYear } from '../util.js';
import { MAX_DESCRIPTION_LENGHT } from '../const.js';
import { formatMinutesToHoursAndMinutes, } from '../util.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

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
      <span class="film-card__duration">${formatMinutesToHoursAndMinutes(film.filmInfo.runtime)}</span>
      <span class="film-card__genre">${String(film.filmInfo.genre).split(',').join(', ')}</span>
    </p>
    <img src="${film.filmInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${showDescription(film.filmInfo.description)}</p>
    <span class="film-card__comments">${film.comments.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist
    ${getActive(film.userDetails.watchlist)}" id="watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched
    ${getActive(film.userDetails.alreadyWatched)}" id="history" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite
    ${getActive(film.userDetails.favorite)}" id="favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCardView extends AbstractStatefulView {

  constructor(film) {
    super();
    this._state = FilmCardView.convertFilmToState(film);
  }

  get template() {
    return createFilmCardTemplate(this._state);
  }

  setOpenPopupButtonClickHandler = (callback) => {
    this._callback.openPopupClick = callback;
    this.element.querySelector('a').addEventListener('click', this.#openPopupButtonClickHandler);
  };

  setControlButtonClickHandler = (callback) => {
    this._callback.controlButtonClick = callback;

    this.element.querySelector('.film-card__controls').addEventListener('click', (evt) => {
      evt.preventDefault();

      let update;
      switch (evt.target) {
        case this.element.querySelector('.film-card__controls-item--add-to-watchlist'):
          update = { ...FilmCardView.convertStateToFilm(this._state), userDetails: {...this._state.userDetails, watchlist: !this._state.userDetails.watchlist }};
          break;
        case this.element.querySelector('.film-card__controls-item--mark-as-watched'):
          update = { ...FilmCardView.convertStateToFilm(this._state), userDetails: {...this._state.userDetails, alreadyWatched: !this._state.userDetails.alreadyWatched }};
          break;
        case this.element.querySelector('.film-card__controls-item--favorite'):
          update = { ...FilmCardView.convertStateToFilm(this._state), userDetails: {...this._state.userDetails, favorite: !this._state.userDetails.favorite }};
          break;
      }

      this.updateElement({
        isDisabled: true
      });

      this._callback.controlButtonClick(update);
    });
  };

  _restoreHandlers = () => {
    this.setOpenPopupButtonClickHandler(this._callback.openPopupClick);
    this.setControlButtonClickHandler(this._callback.controlButtonClick);
  };

  #openPopupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openPopupClick(FilmCardView.convertStateToFilm(this._state));
  };

  static convertFilmToState = (film) => ({...film,
    isDisabled: false,
  });

  static convertStateToFilm = (state) => {
    const film = {...state};

    delete film.isDisabled;

    return film;
  };
}
