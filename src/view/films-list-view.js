import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListTemplate = (headingText) => `<section class="films-list"><h2 class="films-list__title visually-hidden">${headingText}</h2></section>`;

export default class FilmsListView extends AbstractView {
  #heading = null;

  constructor(heading) {
    super();
    this.#heading = heading;
  }

  get template() {
    return createFilmsListTemplate(this.#heading);
  }
}
