import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsCommentsView from '../view/film-details-comments-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class FilmPresenter {
  #container = null;
  #mainContainer = null;
  #commentsModel = null;
  #filmDetailsWrapper = null;
  #filmDetailsInfoComponent = null;
  #filmDetailsCommentsComponent = null;
  #filmCardComponent = null;
  constructor (container) {
    this.#container = container;
  }

  init = (film, filmsContainer, commentsModel) => {
    this.#mainContainer = filmsContainer;
    this.#commentsModel = commentsModel;
    this.#filmCardComponent = new FilmCardView(film);
    this.#filmCardComponent.setOpenPopupButtonClickHandler(this.#renderFilmDetails, film);
    render(this.#filmCardComponent, this.#container);
  };

  #renderFilmDetails = (film) => {
    const comments = [...this.#commentsModel.get(film)];

    this.#filmDetailsWrapper = new FilmDetailsView();
    this.#filmDetailsInfoComponent = new FilmDetailsInfoView(film);
    this.#filmDetailsCommentsComponent = new FilmDetailsCommentsView(comments);
    /**
     * Render film details
     */
    render(this.#filmDetailsWrapper, this.#mainContainer.parentElement, RenderPosition.AFTEREND);
    render(
      this.#filmDetailsInfoComponent,
      this.#filmDetailsWrapper.element.firstChild
    );
    render(
      new FilmDetailsControlsView(film),
      this.#filmDetailsInfoComponent.element,
      RenderPosition.AFTEREND
    );
    render(
      this.#filmDetailsCommentsComponent,
      this.#filmDetailsWrapper.element.firstChild
    );
    render(
      new FilmDetailsFormView(),
      this.#filmDetailsCommentsComponent.element.firstChild
    );

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscapeKey);

    /**
     * Close popup button
     */
    this.#filmDetailsInfoComponent.setCloseButtonClickHandler(this.#removeFilmDetails);
  };

  #removeFilmDetails = () => {
    this.#filmDetailsWrapper.element.remove();
    this.#filmDetailsWrapper.removeElement();
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
}
