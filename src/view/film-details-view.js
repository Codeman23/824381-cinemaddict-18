import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsTemplate = () =>
  '<section class="film-details"><div class="film-details__inner"></div></section>';

export default class FilmDetailsView extends AbstractView {
  get template() {
    return createFilmDetailsTemplate();
  }
}
