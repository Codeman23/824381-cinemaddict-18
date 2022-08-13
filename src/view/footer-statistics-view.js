import { createElement } from '../render.js';

const createFooterStatistics = () => '<p>130 291 movies inside</p>';

export default class FooterStatistics {
  getTemplate() {
    return createFooterStatistics();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
