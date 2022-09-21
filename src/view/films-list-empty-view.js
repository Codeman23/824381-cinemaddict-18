import AbstractView from '../framework/view/abstract-view.js';
import { EmptyBordTextTypes } from '../const.js';

const createFilmsListEmptyTemplate = (filterType) => {
  const BordMessage = EmptyBordTextTypes[filterType];
  return`<section class="films-list"><h2 class="films-list__title">${BordMessage}</h2></section>`;
};

export default class FilmsListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createFilmsListEmptyTemplate(this.#filterType);
  }
}
