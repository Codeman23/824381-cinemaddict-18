import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ButtonMoreView from '../view/button-more-view.js';
import FilmsListEmptyView from '../view/films-list-empty-view.js';
import FilmPresenter from './film-presenter.js';
import { SectionHeadings, ExtraClassNames, FilmsCounters, SortTypes, UserActions, UpdateTypes, FilterTypes} from '../const.js';
import { render, remove } from '../framework/render.js';
import { sortFilmUp, sortRating, filters } from '../util.js';

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #filmsComponent = new FilmsView();
  #filmListEmptyComponent = null;
  #mainListComponent = new FilmsListView(SectionHeadings.ALL_MOVIES, '', ExtraClassNames.VISUALLY_HIDDEN);
  #mainListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ButtonMoreView();
  #renderFilmCount = FilmsCounters.MAIN;
  #addedFilmsPresenter = new Map();
  #filterType = FilterTypes.ALL;
  #currentSortType = SortTypes.DEFAULT;

  constructor (filmsContainer, filmsModel, commentsModel, filterModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.get();
    const films = this.#filmsModel.get();
    const filteredFilms = filters[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortTypes.DATE:
        return filteredFilms.sort(sortFilmUp);
      case SortTypes.RATING:
        return filteredFilms.sort(sortRating);
    }
    return filteredFilms;
  }

  get comments() {
    return this.#commentsModel.get();
  }

  init = () => {
    this.#renderFilmsBoard();
  };

  #handleModeChange = () => {
    this.#addedFilmsPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleMoreButtonClick = () => {
    this.films.slice(this.#renderFilmCount, this.#renderFilmCount + FilmsCounters.MAIN).forEach((film) => this.#renderFilmCard(film, this.#mainListContainerComponent.element));
    this.#renderFilmCount += FilmsCounters.MAIN;

    if(this.#renderFilmCount >= this.films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleViewAction = (actionType, updateType, update, comment) => {
    switch (actionType) {
      case UserActions.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserActions.ADD_COMMENT:
        this.#commentsModel.add(comment);
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserActions.DELETE_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#addedFilmsPresenter.get(data.id).init(data);
        break;
      case UpdateTypes.MINOR:
        this.#clearFilmsBoard();
        this.#renderFilmsBoard();
        break;
      case UpdateTypes.MAJOR:
        this.#clearFilmsBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderFilmsBoard();
        break;
    }
  };

  #clearFilmsBoard = ({resetRenderedTaskCount = false, resetSortType = false} = {}) => {

    this.#addedFilmsPresenter.forEach((presenter) => presenter.destroy());
    this.#addedFilmsPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#showMoreButtonComponent);

    if (this.#filmListEmptyComponent) {
      remove(this.#filmListEmptyComponent);
    }

    if (resetRenderedTaskCount) {
      this.#renderFilmCount = FilmsCounters.MAIN;
    } else {
      this.renderFilmCount = Math.min(this.films.length, this.#renderFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DEFAULT;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmsBoard({resetRenderedTaskCount: true});
    this.#renderFilmsBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#filmsContainer);
  };

  #renderFilmsListEmpty = () => {
    this.#filmListEmptyComponent = new FilmsListEmptyView(this.#filterType);
    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmListEmptyComponent, this.#filmsComponent.element);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#mainListComponent.element);
    this.#showMoreButtonComponent.setClickHandler(this.#handleMoreButtonClick);
  };

  #renderFilmCard = (film, container) => {
    const filmPresenter = new FilmPresenter(container, this.#filmsContainer, this.comments, this.#handleViewAction, this.#handleModeChange, this.#filterType);
    filmPresenter.init(film);
    this.#addedFilmsPresenter.set(film.id, filmPresenter);
  };

  #renderFilmCards = (films, container) => {
    films.forEach((film) => this.#renderFilmCard(film, container));
  };

  #renderFilmsBoard = () => {
    const filmCount = this.films.length;

    if (filmCount === 0) {
      this.#renderFilmsListEmpty();
      return;
    }

    this.#renderSort();

    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#mainListComponent, this.#filmsComponent.element);
    render(this.#mainListContainerComponent, this.#mainListComponent.element);

    this.#renderFilmCards(this.films.slice(0, Math.min(filmCount, this.#renderFilmCount)), this.#mainListContainerComponent.element);

    if (filmCount > this.#renderFilmCount) {
      this.#renderShowMoreButton();
    }
  };
}
