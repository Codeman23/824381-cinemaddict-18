import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatistics = (films) => {
  const filmsAmount = [...films.get()].length;

  return `<p>${filmsAmount} movies inside</p>`;
};

export default class FooterStatistics extends AbstractView{
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createFooterStatistics(this.#films);
  }
}
