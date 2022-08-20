import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsCommentsView from '../view/film-details-comments-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';
import { RenderPositions } from '../const.js';
import { render } from '../render.js';

export default class FilmDetailsPresenter {
  #filmDetailsWrapper = new FilmDetailsView();
  #bodyContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = null;
  #comments = null;

  init = (bodyContainer, filmsModel, commentsModel) => {
    this.#bodyContainer = bodyContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#films = [...this.#filmsModel.get()];
    this.#comments = [...this.#commentsModel.get(this.#films[0])];

    /**
     * Render film details wrapper
     */
    render(this.#filmDetailsWrapper, this.#bodyContainer, RenderPositions.AFTEREND);

    /**
     * Render film details info and controls
     */
    render(
      new FilmDetailsInfoView(this.#films[0]),
      this.#filmDetailsWrapper.element.querySelector('.film-details__inner')
    );
    render(
      new FilmDetailsControlsView(this.#films[0]),
      this.#filmDetailsWrapper.element.querySelector('.film-details__info-wrap'),
      RenderPositions.AFTEREND
    );

    /**
     * Render film details comments and form
     */
    render(
      new FilmDetailsCommentsView(this.#comments),
      this.#filmDetailsWrapper.element.querySelector('.film-details__inner')
    );
    render(
      new FilmDetailsFormView(),
      this.#filmDetailsWrapper.element.querySelector('.film-details__comments-wrap')
    );
  };
}
