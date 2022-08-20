import FilmsView from '../view/films-view.js';
import SortView from '../view/sort-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonMoreView from '../view/button-more-view.js';
import { SectionHeadings, ExtraClassNames, FilmsCounters } from '../const.js';
import { render } from '../render.js';

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #mainListComponent = new FilmsListView(SectionHeadings.ALL_MOVIES, '', ExtraClassNames.VISUALLY_HIDDEN);
  #ratedListComponent = new FilmsListView(SectionHeadings.RATED, ExtraClassNames.FILMS_LIST_EXTRA);
  #commentedListComponent = new FilmsListView(SectionHeadings.COMMENTED, ExtraClassNames.FILMS_LIST_EXTRA);
  #filmsContainer = null;
  #filmsModel = null;
  #films = null;

  init = (filmsContainer, filmsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.get()];

    /**
     * Function that render film cards
     * @param {*} counter - cards counter
     * @param {*} container - container for cards
     */
    const getFilmCards = (counter, films, container) => {
      for (let i = 0; i < counter; i++) {
        render(new FilmCardView(films[i]), container);
      }
    };

    /**
     * Render sort menu and films lists wrapper
     */
    render(new SortView(), this.#filmsContainer);
    render(this.#filmsComponent, this.#filmsContainer);

    /**
     * Render main films list
     */
    render(this.#mainListComponent, this.#filmsComponent.element);
    getFilmCards(
      FilmsCounters.MAIN,
      this.#films,
      this.#mainListComponent.element.querySelector('.films-list__container')
    );
    render(new ButtonMoreView(), this.#mainListComponent.element);

    /**
     * Render rated films list
     */
    render(this.#ratedListComponent, this.#filmsComponent.element);
    getFilmCards(
      FilmsCounters.EXTRA,
      this.#films,
      this.#ratedListComponent.element.querySelector('.films-list__container')
    );

    /**
     * Render commented films list
     */
    render(this.#commentedListComponent, this.#filmsComponent.element);
    getFilmCards(
      FilmsCounters.EXTRA,
      this.#films,
      this.#commentedListComponent.element.querySelector('.films-list__container')
    );
  };
}
