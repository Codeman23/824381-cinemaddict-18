import AbstractView from '../framework/view/abstract-view.js';
import { generateFilters } from '../mock/filter-mock.js';

const createFilterTemplate = (films) => {
  const allFilters = generateFilters( [...films.get()].map((item) => item.userDetails));
  /**
   * Function that named and counted filters
   * @param {*} navFilters - userDetails data
   * @returns filters markup
  */
  const generateLinks = (navFilters) => navFilters.map((filter) => (`<a href="#${filter.name}" class="main-navigation__item">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`)).join('');

  return`<nav class="main-navigation"><a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>${generateLinks(allFilters)}</nav>`;};

export default class FilterView extends AbstractView{
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createFilterTemplate(this.#films);
  }
}
