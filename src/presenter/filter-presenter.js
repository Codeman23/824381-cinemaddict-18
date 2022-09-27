import {render, remove, replace, RenderPosition} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {filters} from '../util';
import {FilterTypes, UpdateTypes} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filmsModel = null;
  #filterModel = null;
  #filterComponent = null;

  constructor(filterContainer, filmsModel, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = [...this.#filmsModel.get()];

    return [
      {
        type: FilterTypes.ALL,
        name: 'All movies',
        count: '',
      },
      {
        type: FilterTypes.WATCHLIST,
        name: 'Watchlist',
        count: filters[FilterTypes.WATCHLIST](films).length,
      },
      {
        type: FilterTypes.HISTORY,
        name: 'History',
        count: filters[FilterTypes.HISTORY](films).length,
      },
      {
        type: FilterTypes.FAVORITE,
        name: 'Favorites',
        count: filters[FilterTypes.FAVORITE](films).length,
      },
    ];
  }

  init = () => {
    const allFilters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(allFilters, this.#filterModel.get());
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer, RenderPosition.BEFOREBEGIN);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.set(UpdateTypes.MAJOR, filterType);
  };
}
