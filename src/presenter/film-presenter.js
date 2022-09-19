import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render, replace, remove, RenderPosition} from '../framework/render.js';
import { FilmModes, UserActions, UpdateTypes, FilterTypes } from '../const.js';

export default class FilmPresenter {
  #container = null;
  #mainContainer = null;
  #comments = null;
  #filmDetailsComponent = null;
  #filmCardComponent = null;
  #film = null;
  #changeData = null;
  #changeMode = null;
  #filterType = null;
  #mode = FilmModes.DEFAULT;

  constructor (container, filmsContainer, comments, changeData, changeMode, filterType) {
    this.#container = container;
    this.#mainContainer = filmsContainer;
    this.#comments = comments;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#filterType = filterType;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmCardComponent = new FilmCardView(film);

    this.#filmCardComponent.setOpenPopupButtonClickHandler(this.#renderFilmDetails);
    this.#filmCardComponent.setControlButtonClickHandler(this.#handleControlButtonClick);


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

  #renderFilmDetails = () => {
    this.#changeMode();
    this.#mode = FilmModes.POPUP;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);

    this.#setFilmDetailsClickHandlers();

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscapeKey);

    render(this.#filmDetailsComponent, this.#mainContainer.parentElement, RenderPosition.AFTEREND);
  };

  #setFilmDetailsClickHandlers = () => {
    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#removeFilmDetails);
    this.#filmDetailsComponent.setControlButtonClickHandler(this.#handleControlButtonClick);
  };

  #removeFilmDetails = () => {
    document.body.classList.remove('hide-overflow');
    remove(this.#filmDetailsComponent);
    document.removeEventListener('keydown', this.#onEscapeKey);
  };

  #onEscapeKey = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetails();
      document.removeEventListener('keydown', this.#onEscapeKey);
    }
  };

  #handleControlButtonClick = (update) => {
    const updateType = (filterType) => filterType === FilterTypes.ALL ? UpdateTypes.PATCH : UpdateTypes.MINOR;

    this.#changeData(
      UserActions.UPDATE_FILM,
      updateType(this.#filterType),
      update
    );
  };
}
