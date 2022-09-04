import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ButtonMoreView from '../view/button-more-view.js';
import FilmsListEmptyView from '../view/films-list-empty-view.js';
import FilmPresenter from './film-presenter.js';
import { SectionHeadings, ExtraClassNames, FilmsCounters } from '../const.js';
import { render, remove } from '../framework/render.js';
import { updateItem } from '../util.js';

export default class FilmsPresenter {
  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmListEmptyComponent = new FilmsListEmptyView();
  #mainListComponent = new FilmsListView(SectionHeadings.ALL_MOVIES, '', ExtraClassNames.VISUALLY_HIDDEN);
  #mainListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ButtonMoreView();
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];
  #renderFilmCount = FilmsCounters.MAIN;
  #addedFilmsPresenter = new Map();

  constructor (filmsContainer, filmsModel, commentsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.get()];
    this.#renderFilmsBoard();
  };

  #handleModeChange = () => {
    this.#addedFilmsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderFilmCard = (film, container) => {
    const filmPresenter = new FilmPresenter(container, this.#filmsContainer, this.#commentsModel, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#addedFilmsPresenter.set(film.id, filmPresenter);
  };

  #handleMoreButtonClick = () => {
    this.#films.slice(this.#renderFilmCount, this.#renderFilmCount + FilmsCounters.MAIN).forEach((film)=> this.#renderFilmCard(film, this.#mainListContainerComponent.element));
    this.#renderFilmCount += FilmsCounters.MAIN;

    if(this.#renderFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#addedFilmsPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmsContainer);
  };

  #renderFilmsListEmpty = () => {
    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmListEmptyComponent, this.#filmsComponent.element);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#mainListComponent.element);
    this.#showMoreButtonComponent.setClickHandler(this.#handleMoreButtonClick);
  };

  #clearFilmsList = () => {
    this.#addedFilmsPresenter.forEach((presenter) => presenter.destroy());
    this.#addedFilmsPresenter.clear();
    this.#renderFilmCount = FilmsCounters.MAIN;
    remove(this.#showMoreButtonComponent);
  };

  /**
   * Method that render film cards
   * @param {*} counter - cards counter
   * @param {*} films - films data
   * @param {*} container - container for cards
   */
  #renderFilms = (counter, films, container) => {
    for (let i = 0; i < counter; i++) {
      this.#renderFilmCard(films[i], container);
    }
  };

  #renderFilmsList = () => {
    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#mainListComponent, this.#filmsComponent.element);
    render(this.#mainListContainerComponent, this.#mainListComponent.element);
    this.#renderFilms(
      Math.min(this.#films.length, this.#renderFilmCount ),
      this.#films,
      this.#mainListContainerComponent.element
    );
    /**
    * Check for show-more-button
    */
    if (this.#films.length > this.#renderFilmCount) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilmsBoard = () => {
    /**
    * Render films board or empty board
    */
    if (this.#films.length === 0) {
      this.#renderFilmsListEmpty();
    } else {
      this.#renderSort();
      this.#renderFilmsList();
    }
  };
}
