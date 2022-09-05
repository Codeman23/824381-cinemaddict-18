import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortTemplate = () => `
<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`;

export default class SortView extends AbstractView{

  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #toggleActiveClass = (evt) => {
    const activeButton = this.element.querySelector('.sort__button--active');
    activeButton.classList.remove('sort__button--active'); 
    evt.target.classList.add('sort__button--active');
  };

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.#toggleActiveClass(evt);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
