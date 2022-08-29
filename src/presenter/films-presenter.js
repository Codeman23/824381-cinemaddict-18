import FilmsView from '../view/films-view.js';
import SortView from '../view/sort-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonMoreView from '../view/button-more-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmsListEmptyView from '../view/films-list-empty-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsCommentsView from '../view/film-details-comments-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';
import { SectionHeadings, ExtraClassNames, FilmsCounters } from '../const.js';
import { render, RenderPosition } from '../framework/render.js';

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #mainListComponent = new FilmsListView(SectionHeadings.ALL_MOVIES, '', ExtraClassNames.VISUALLY_HIDDEN);
  #ratedListComponent = new FilmsListView(SectionHeadings.RATED, ExtraClassNames.FILMS_LIST_EXTRA);
  #commentedListComponent = new FilmsListView(SectionHeadings.COMMENTED, ExtraClassNames.FILMS_LIST_EXTRA);
  #mainListContainerComponent = new FilmsListContainerView();
  #ratedListContainerComponent = new FilmsListContainerView();
  #commentedListContainerComponent = new FilmsListContainerView();
  #loadMoreButtonComponent = new ButtonMoreView();
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmDetailsWrapper = null;
  #filmDetailsInfoComponent = null;
  #filmDetailsCommentsComponent = null;
  #filmCardComponent = null;
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

  #renderFilmCard (film, container) {
    this.#filmCardComponent = new FilmCardView(film);

    /**
     * Open popup buttons add
     */
    this.#filmCardComponent.setOpenPopupButtonClickHandler(this.#renderFilmDetailsComponent, film);
    render(this.#filmCardComponent, container);
  }

  #renderFilmDetailsComponent = (film) => {
    const comments = [...this.#commentsModel.get(film)];

    this.#filmDetailsWrapper = new FilmDetailsView();
    this.#filmDetailsInfoComponent = new FilmDetailsInfoView(film);
    this.#filmDetailsCommentsComponent = new FilmDetailsCommentsView(comments);

    /**
     * Render film details
     */
    render(this.#filmDetailsWrapper, this.#filmsContainer.parentElement, RenderPosition.AFTEREND);

    render(
      this.#filmDetailsInfoComponent,
      this.#filmDetailsWrapper.element.firstChild
    );

    render(
      new FilmDetailsControlsView(film),
      this.#filmDetailsInfoComponent.element,
      RenderPosition.AFTEREND
    );

    render(
      this.#filmDetailsCommentsComponent,
      this.#filmDetailsWrapper.element.firstChild
    );

    render(
      new FilmDetailsFormView(),
      this.#filmDetailsCommentsComponent.element.firstChild
    );

    /**
     * Close popup button
     */
    this.#filmDetailsInfoComponent.setCloseButtonClickHandler(this.#removeFilmDetailsComponent);

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscapeKey);
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsWrapper.element.remove();
    this.#filmDetailsWrapper.removeElement();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscapeKey);
  };

  #onEscapeKey = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscapeKey);
    }
  };

  #onMoreButtonClick = () => {
    this.#films.slice(this.#renderFilmCount, this.#renderFilmCount + FilmsCounters.MAIN).forEach((film)=> this.#renderFilmCard(film, this.#mainListContainerComponent.element));

    this.#renderFilmCount += FilmsCounters.MAIN;

    if(this.#renderFilmCount >= this.#films.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

  #renderFilmsBoard() {
    const topRatedFilms = [...this.#films].sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating);
    const mostCommentedFilms = [...this.#films].sort((a, b) => a.comments.length < b.comments.length);

    /**
     * Function that render film cards
     * @param {*} counter - cards counter
     * @param {*} films - films data
     * @param {*} container - container for cards
     */
    const getFilmCards = (counter, films, container) => {
      for (let i = 0; i < counter; i++) {
        this.#renderFilmCard(films[i], container);
      }
    };

    /**
    * Render films board or empty board
    */
    if (this.#films.length === 0) {
      render(this.#filmsComponent, this.#filmsContainer);
      render(new FilmsListEmptyView() , this.#filmsComponent.element);
    } else {
      /**
      * Render sort menu
      */
      render(new SortView(), this.#filmsContainer);
      render(this.#filmsComponent, this.#filmsContainer);
      render(this.#mainListComponent, this.#filmsComponent.element);

      /**
      * Render main films list
      */
      render(this.#mainListContainerComponent, this.#mainListComponent.element);
      getFilmCards(
        Math.min(this.#films.length, this.#renderFilmCount ),
        this.#films,
        this.#mainListContainerComponent.element
      );
      /**
      * Render load-more-button
      */
      if (this.#films.length > this.#renderFilmCount) {
        render(this.#loadMoreButtonComponent , this.#mainListComponent.element);
        this.#loadMoreButtonComponent.setClickHandler(this.#onMoreButtonClick);
      }

      /**
      * Render rated and commented films list
      */
      if(this.#films.length >= FilmsCounters.EXTRA ) {
        render(this.#ratedListComponent, this.#filmsComponent.element);
        render(this.#ratedListContainerComponent, this.#ratedListComponent.element);
        getFilmCards(
          FilmsCounters.EXTRA,
          topRatedFilms,
          this.#ratedListContainerComponent.element
        );
        render(this.#commentedListComponent, this.#filmsComponent.element);
        render(this.#commentedListContainerComponent, this.#commentedListComponent.element);
        getFilmCards(
          FilmsCounters.EXTRA,
          mostCommentedFilms,
          this.#commentedListContainerComponent.element
        );
      }
    }
  }
}
