import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render, replace, remove, RenderPosition} from '../framework/render.js';
import { FilmModes, CommentEmotions } from '../const.js';

export default class FilmPresenter {
  #container = null;
  #mainContainer = null;
  #commentsModel = null;
  #comments = null;
  #filmDetailsComponent = null;
  #filmCardComponent = null;
  #film = null;
  #changeData = null;
  #changeMode = null;
  #mode = FilmModes.DEFAULT;

  constructor (container, filmsContainer, commentsModel, changeData, changeMode) {
    this.#container = container;
    this.#mainContainer = filmsContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#comments = [...this.#commentsModel.get(film)];
    this.#filmCardComponent = new FilmCardView(film);
    this.#setFilmCardClickHandlers();

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#container);
      return;
    }

    if (this.#mode === FilmModes.DEFAULT) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#mode === FilmModes.POPUP) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
      this.#filmDetailsComponent = new FilmDetailsView(film, this.#comments);
      this.#setFilmDetailsClickHandlers();
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }
    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmDetailsComponent);
  };

  resetView = () => {
    if (this.#mode !== FilmModes.DEFAULT) {
      this.#removeFilmDetails();
    }
  };

  #setFilmCardClickHandlers() {
    this.#filmCardComponent.setOpenPopupButtonClickHandler(this.#renderFilmDetails);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handlerWatchlistClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handlerAlreadyWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handlerFavoriteClick);
  }

  #setFilmDetailsClickHandlers() {
    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#removeFilmDetails);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#handlerWatchlistClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandler(this.#handlerAlreadyWatchedClick);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#handlerFavoriteClick);
  }

  #renderFilmDetails = (film) => {
    this.#changeMode();
    this.#mode = FilmModes.POPUP;

    this.#filmDetailsComponent = new FilmDetailsView(film, this.#comments);
    render(this.#filmDetailsComponent, this.#mainContainer.parentElement, RenderPosition.AFTEREND);
    this.#setFilmDetailsClickHandlers();

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscapeKey);
  };

  #removeFilmDetails = () => {
    this.#mode = FilmModes.DEFAULT;

    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent.removeElement();

    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscapeKey);
  };

  #onEscapeKey = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetails();
      document.removeEventListener('keydown', this.#onEscapeKey);
    }
  };

  #handlerWatchlistClick = () => {
    this.#changeData ({...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}});
  };

  #handlerAlreadyWatchedClick = () => {
    this.#changeData ({...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}});
  };

  #handlerFavoriteClick = () => {
    this.#changeData ({...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}});
  };
}
