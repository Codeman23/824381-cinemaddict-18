import { createElement } from '../render.js';

const createFooterStatistics = () => '<p>130 291 movies inside</p>';

export default class FooterStatistics {
  #element = null;

  get template() {
    return createFooterStatistics();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
