import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsCommentsView from '../view/film-details-comments-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';
import { RenderPositions } from '../const.js';
import { render } from '../render.js';

export default class FilmDetailsPresenter {
  constructor() {
    this.filmDetailsWrapper = new FilmDetailsView();
    this.filmDetailsInfo = new FilmDetailsInfoView();
    this.filmDetailsComments = new FilmDetailsCommentsView();
  }

  init = (bodyContainer) => {
    this.bodyContainer = bodyContainer;

    /**
     * Render film details wrapper
     */
    render(this.filmDetailsWrapper, this.bodyContainer, RenderPositions.AFTEREND);

    /**
     * Render film details info and controls
     */
    render(this.filmDetailsInfo, this.filmDetailsWrapper.getElement().querySelector('.film-details__inner'));
    render(new FilmDetailsControlsView(), this.filmDetailsInfo.getElement());

    /**
     * Render film details comments and form
     */
    render(this.filmDetailsComments, this.filmDetailsWrapper.getElement().querySelector('.film-details__inner'));
    render(
      new FilmDetailsFormView(),
      this.filmDetailsComments.getElement().querySelector('.film-details__comments-wrap')
    );
  };
}
