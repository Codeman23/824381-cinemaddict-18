import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return (
    `<a href="#${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
    data-filter-type="${type}">
      ${name} ${type === 'All' ? '' : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`
  );
};

const createFilter = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    ${filterItemsTemplate}
    </nav>`;
};

export default class FilterView extends AbstractView{
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilter(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    const target = evt.target;
    if (target.classList.contains('main-navigation__item' ) || target.classList.contains('main-navigation__item-count')) {
      evt.preventDefault();
      this._callback.filterTypeChange(target.closest('.main-navigation__item').dataset.filterType);
    }
  };
}
