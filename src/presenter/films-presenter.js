import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ButtonMoreView from '../view/button-more-view.js';
import FilmsListEmptyView from '../view/films-list-empty-view.js';
import FilmPresenter from './film-presenter.js';
import { SectionHeadings, ExtraClassNames, FilmsCounters } from '../const.js';
import { render} from '../framework/render.js';

export default class FilmsPresenter {
  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmListEmptyComponent = new FilmsListEmptyView();
  #mainListComponent = new FilmsListView(SectionHeadings.ALL_MOVIES, '', ExtraClassNames.VISUALLY_HIDDEN);
  #ratedListComponent = new FilmsListView(SectionHeadings.RATED, ExtraClassNames.FILMS_LIST_EXTRA);
  #commentedListComponent = new FilmsListView(SectionHeadings.COMMENTED, ExtraClassNames.FILMS_LIST_EXTRA);
  #mainListContainerComponent = new FilmsListContainerView();
  #ratedListContainerComponent = new FilmsListContainerView();
  #commentedListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ButtonMoreView();
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];
  #renderFilmCount = FilmsCounters.MAIN;

  constructor (filmsContainer, filmsModel, commentsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.get()];
    this.#renderFilmsBoard();
  };

  #renderFilmCard = (film, container) => {
    const filmPresenter = new FilmPresenter(container);
    filmPresenter.init(film, this.#filmsContainer, this.#commentsModel);
  };

  #handleMoreButtonClick = () => {
    this.#films.slice(this.#renderFilmCount, this.#renderFilmCount + FilmsCounters.MAIN).forEach((film)=> this.#renderFilmCard(film, this.#mainListContainerComponent.element));
    this.#renderFilmCount += FilmsCounters.MAIN;

    if(this.#renderFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmsContainer);
  };

  #renderFilmsListEmpty = () => {
    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmListEmptyComponent, this.#filmsComponent.element);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent , this.#mainListComponent.element);
    this.#showMoreButtonComponent.setClickHandler(this.#handleMoreButtonClick);
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

  #renderFilmsListsExtra = () => {
    const topRatedFilms = [...this.#films].sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating);
    const mostCommentedFilms = [...this.#films].sort((a, b) => a.comments.length < b.comments.length);
    /**
     * Render rated films list
     */
    render(this.#ratedListComponent, this.#filmsComponent.element);
    render(this.#ratedListContainerComponent, this.#ratedListComponent.element);
    this.#renderFilms(
      FilmsCounters.EXTRA,
      topRatedFilms,
      this.#ratedListContainerComponent.element
    );
    /**
     * Rander commneted films list
     */
    render(this.#commentedListComponent, this.#filmsComponent.element);
    render(this.#commentedListContainerComponent, this.#commentedListComponent.element);
    this.#renderFilms(
      FilmsCounters.EXTRA,
      mostCommentedFilms,
      this.#commentedListContainerComponent.element
    );
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
      this.#renderFilmsListsExtra();
    }
  };
}
