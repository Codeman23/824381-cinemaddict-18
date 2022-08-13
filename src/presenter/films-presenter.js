import FilmsView from '../view/films-view.js';
import SortView from '../view/sort-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonMoreView from '../view/button-more-view.js';
import { SectionHeadings, ExtraClassNames, FilmsCounters } from '../const.js';
import { render } from '../render.js';

export default class FilmsPresenter {
  constructor() {
    this.filmsComponent = new FilmsView();
    this.mainListComponent = new FilmsListView(SectionHeadings.ALL_MOVIES, '', ExtraClassNames.VISUALLY_HIDDEN);
    this.ratedListComponent = new FilmsListView(SectionHeadings.RATED, ExtraClassNames.FILMS_LIST_EXTRA);
    this.commentedListComponent = new FilmsListView(SectionHeadings.COMMENTED, ExtraClassNames.FILMS_LIST_EXTRA);
  }

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;
    /**
     * Function that render film cards
     * @param {*} counter - cards counter
     * @param {*} container - container for cards
     */
    const getFilmCards = (counter, container) => {
      for (let i = 0; i < counter; i++) {
        render(new FilmCardView(), container);
      }
    };

    /**
     * Render sort menu and films lists wrapper
     */
    render(new SortView(), this.filmsContainer);
    render(this.filmsComponent, this.filmsContainer);

    /**
     * Render main films list
     */
    render(this.mainListComponent, this.filmsComponent.getElement());
    getFilmCards(FilmsCounters.MAIN, this.mainListComponent.getElement().querySelector('.films-list__container'));
    render(new ButtonMoreView(), this.mainListComponent.getElement());

    /**
     * Render rated films list
     */
    render(this.ratedListComponent, this.filmsComponent.getElement());
    getFilmCards(FilmsCounters.EXTRA, this.ratedListComponent.getElement().querySelector('.films-list__container'));

    /**
     * Render commented films list
     */
    render(this.commentedListComponent, this.filmsComponent.getElement());
    getFilmCards(FilmsCounters.EXTRA, this.commentedListComponent.getElement().querySelector('.films-list__container'));
  };
}
