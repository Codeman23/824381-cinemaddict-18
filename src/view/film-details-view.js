import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EmotionTypes } from '../const.js';

const createFilmDetailsTemplate = (film) => {
  console.log(film);
  /**
   * Function that return genres markup
   * @param {*} genres - genres data
   * @returns genres markup
   */
  const getGenres = (genres) => genres.split(',').map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

  /**
   * Function that add active class to buttons
   * @param {*} isChecked - boolean value
   * @returns active class
   */
  const getActive = (isChecked) => isChecked && 'film-details__control-button--active';

  return `
  <section class="film-details">
    <div class="film-details__inner">
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
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist 
          ${getActive(film.userDetails.watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched 
          ${getActive(film.userDetails.alreadyWatched)}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite 
          ${getActive(film.userDetails.favorite)}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">
          ${film.comments.length}</span></h3>
          <ul class="film-details__comments-list">
            ${film.comments.map((comment) =>`<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
              </span>
              <div>
                <p class="film-details__comment-text">${comment.comment}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${comment.author}</span>
                  <span class="film-details__comment-day">${comment.date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
              </li>`).join('')}
          </ul>
          <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label">
            ${film.checkedEmotion ? `<img src="images/emoji/${film.checkedEmotion}.png" alt="emoji-${film.checkedEmotion}" width="55" height="55">` : ''}
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="${film.comment ? film.comment : 'Select reaction below and write comment here'}" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            <input ${film.checkedEmotion === EmotionTypes.SMILE ? 'checked' : ''}  class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile" data-emotion=${EmotionTypes.SMILE}>
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>
            <input ${film.checkedEmotion === EmotionTypes.SLEEPING ? 'checked' : ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping" data-emotion=${EmotionTypes.SLEEPING}>
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>
            <input ${film.checkedEmotion === EmotionTypes.PUKE ? 'checked' : ''}  class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke" data-emotion=${EmotionTypes.PUKE}>
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>
            <input ${film.checkedEmotion === EmotionTypes.ANGRY ? 'checked' : ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry" data-emotion=${EmotionTypes.ANGRY}>
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
          </form>
        </section>
      </div>  
    </div>
  </section>`;};

export default class FilmDetailsView extends AbstractStatefulView {

  constructor(film, comments, viewCondition, updateViewCondition) {
    super();
    this._state = FilmDetailsView.parseFilmToState(
      film,
      comments,
      viewCondition.emotion,
      viewCondition.comment,
      viewCondition.scrollPosition
    );
    this.updateViewCondition = updateViewCondition;
    this.#setCommentHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.setScrollPosition();
    this.#setCommentHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  };

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
  };

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler );
  };

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewCondition();
    this._callback.watchlistClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewCondition();
    this._callback.alreadyWatchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewCondition();
    this._callback.favoriteClick();
  };

  #emotionClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedEmotion: evt.currentTarget.dataset.emotion,
      scrollPosition: this.element.scrollTop
    });
  };

  #commentInputChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({comment: evt.target.value});
  };

  #setCommentHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-label').forEach( (element) => {element.addEventListener('click', this.#emotionClickHandler);});
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputChangeHandler);
  };

  #updateViewCondition = () => {
    this.updateViewCondition({
      emotion: this._state.checkedEmotion,
      comment: this._state.comment,
      scrollPosition: this.element.scrollTop
    });
  };

  static parseFilmToState = (film, comments, checkedEmotion = null, comment = null, scrollPosition = 0) => (
    { ...film, comments, checkedEmotion, comment, scrollPosition});
}
