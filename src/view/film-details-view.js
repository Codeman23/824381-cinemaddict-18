import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EmotionTypes } from '../const.js';
import { sortComments } from '../util.js';
import { getRandomInteger} from '../util';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { pressCtrlEnter } from '../util.js';
import he from 'he';

dayjs.extend(relativeTimePlugin);

const createFilmDetailsTemplate = (film) => {
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
          ${getActive(film.userDetails.alreadyWatched)}" id="history" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite 
          ${getActive(film.userDetails.favorite)}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments 
          <span class="film-details__comments-count">${film.popupComments.length}</span></h3>
          <ul class="film-details__comments-list">

            ${film.popupComments.map((comment) =>`<li class="film-details__comment" data-comment-id="${comment.id}">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
              </span>
              <div>
                <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
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
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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
  #scrollPosition = 0;

  constructor(film, comments) {
    super();
    this._state = FilmDetailsView.convertFilmToState( film, sortComments(film, comments) );

    this.#setCommentHandlers();
    this.#setScrollPosition();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  setControlButtonClickHandler = (callback) => {
    this._callback.controlButtonClick = callback;

    this.element.querySelector('.film-details__controls').addEventListener('click', (evt) => {
      evt.preventDefault();
      const buttonName = evt.target.id;

      switch (evt.target) {
        case this.element.querySelector('.film-details__control-button--watchlist'):
          this.updateElement({
            ...this._state, userDetails: { ...this._state.userDetails, watchlist: !this._state.userDetails.watchlist }
          });
          break;
        case this.element.querySelector('.film-details__control-button--watched'):
          this.updateElement({
            ...this._state, userDetails: { ...this._state.userDetails, alreadyWatched: !this._state.userDetails.alreadyWatched }
          });
          break;
        case this.element.querySelector('.film-details__control-button--favorite'):
          this.updateElement({
            ...this._state, userDetails: { ...this._state.userDetails, favorite: !this._state.userDetails.favorite }
          });
          break;
      }

      this._callback.controlButtonClick({...FilmDetailsView.convertStateToFilm(this._state)}, buttonName, this.#scrollPosition);
    });
  };

  setCommentAddHandler = (callback) => {
    this._callback.commentFormSubmit = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#commentAddHandler);
  };

  setCommentDeleteHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((button) => button.addEventListener('click', this.#commentDeleteClickHandler));
  };

  _restoreHandlers = () => {
    this.#setScrollPosition();
    this.#setCommentHandlers();
    this.setControlButtonClickHandler(this._callback.controlButtonClick);
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setCommentAddHandler(this._callback.commentFormSubmit);
    this.setCommentDeleteHandler(this._callback.deleteClick);
  };

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
  };

  #setScrollPosition = () => {
    this.element.addEventListener ('scroll', () => {
      this.#scrollPosition = this.element.scrollTop;
    });
  };

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };

  #emotionClickHandler = (evt) => {
    const scrollPosition = this.element.scrollTop;
    const target = evt.currentTarget.dataset.emotion;

    evt.preventDefault();
    this.updateElement({
      checkedEmotion: target
    });
    this.element.scrollTop = scrollPosition;
  };

  #commentInputChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({description: evt.target.value});
  };

  #commentAddHandler = (evt) => {
    if(!this._state.checkedEmotion || this._state.description === '') {
      return;
    }

    if (pressCtrlEnter(evt)) {
      evt.preventDefault();

      const newComment = {
        id: String(getRandomInteger(60, 80)),
        author: 'Unknown',
        comment: evt.target.value,
        date: dayjs().fromNow(true),
        emotion: this._state.checkedEmotion
      };

      this.updateElement({
        popupComments: [...this._state.popupComments, newComment],
        description: '',
        checkedEmotion: false
      });

      const update = {...FilmDetailsView.convertStateToFilm(this._state), comments: [...this._state.comments, newComment.id]};
      this._callback.commentFormSubmit(update, newComment, this.#scrollPosition);
    }
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();

    const currentId = evt.target.closest('.film-details__comment').dataset.commentId;
    const comment = this._state.popupComments.find((item) => item.id === currentId);
    const updatedComments = this._state.comments.filter((item) => item !== currentId);
    const update = {...FilmDetailsView.convertStateToFilm(this._state), comments: updatedComments};

    this.updateElement({
      comments: updatedComments,
      popupComments: this._state.popupComments.filter((item) => item !== comment)
    });

    this._callback.deleteClick(update, comment, this.#scrollPosition);
  };

  #setCommentHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-label').forEach( (element) => {element.addEventListener('click', this.#emotionClickHandler);});
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputChangeHandler);
  };

  static convertFilmToState = (film, popupComments) => ({...film, checkedEmotion: false, description: '', popupComments});

  static convertStateToFilm = (state) => {
    const film = {...state};

    delete film.checkedEmotion;
    delete film.description;
    delete film.popupComments;

    return film;
  };
}
