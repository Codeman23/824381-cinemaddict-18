import FilmsView from '../view/films-view.js';
import SortView from '../view/sort-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonMoreView from '../view/button-more-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmsListEmptyView from '../view/films-list-empty-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsCommentsView from '../view/film-details-comments-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';
import { SectionHeadings, ExtraClassNames, FilmsCounters, RenderPositions } from '../const.js';
import { render } from '../render.js';

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #mainListComponent = new FilmsListView(SectionHeadings.ALL_MOVIES, '', ExtraClassNames.VISUALLY_HIDDEN);
  #ratedListComponent = new FilmsListView(SectionHeadings.RATED, ExtraClassNames.FILMS_LIST_EXTRA);
  #commentedListComponent = new FilmsListView(SectionHeadings.COMMENTED, ExtraClassNames.FILMS_LIST_EXTRA);
  #loadMoreButtonComponent = new ButtonMoreView();
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmDetailsWrapper = null;
  #films = [];
  #renderFilmCount = FilmsCounters.MAIN;

  #renderFilmCard (film, container) {
    const filmCardComponent = new FilmCardView(film);
    const filmCardComponentLinks = filmCardComponent.element.querySelector('a');

    filmCardComponentLinks.addEventListener('click', () => {
      this.#renderFilmDetailsComponent(film);
      document.addEventListener('keydown', this.#onEscapeKey);
    });

    render(filmCardComponent, container);
  }

  #renderFilmDetailsComponent (film) {
    const comments = [...this.#commentsModel.get(film)];
    this.#filmDetailsWrapper = new FilmDetailsView();

    /**
     * Render film details
     */
    render(this.#filmDetailsWrapper, this.#filmsComponent.element.closest('.main'), RenderPositions.AFTEREND);

    render(
      new FilmDetailsInfoView(film),
      this.#filmDetailsWrapper.element.querySelector('.film-details__inner')
    );

    render(
      new FilmDetailsControlsView(film),
      this.#filmDetailsWrapper.element.querySelector('.film-details__info-wrap'),
      RenderPositions.AFTEREND
    );

    render(
      new FilmDetailsCommentsView(comments),
      this.#filmDetailsWrapper.element.querySelector('.film-details__inner')
    );

    render(
      new FilmDetailsFormView(),
      this.#filmDetailsWrapper.element.querySelector('.film-details__comments-wrap')
    );

    /**
     * Close button event
     */
    const buttonClose = this.#filmDetailsWrapper.element.querySelector('.film-details__close-btn');

    buttonClose.addEventListener('click', ()=> {
      this.#removeFilmDetailsComponent();
    });

    document.body.classList.add('hide-overflow');
  }

  #removeFilmDetailsComponent(){
    this.#filmDetailsWrapper.element.remove();
    this.#filmDetailsWrapper.removeElement();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscapeKey);
  }

  #onEscapeKey = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscapeKey);
    }
  };

  #onMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#films.slice(this.#renderFilmCount, this.#renderFilmCount + FilmsCounters.MAIN).forEach((film)=> this.#renderFilmCard(film, this.#mainListComponent.element.querySelector('.films-list__container')));

    this.#renderFilmCount += FilmsCounters.MAIN;

    if(this.#renderFilmCount >= this.#films.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

  init = (filmsContainer, filmsModel, commentsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.get()];
    this.#commentsModel = commentsModel;

    /**
     * Function that render film cards
     * @param {*} counter - cards counter
     * @param {*} container - container for cards
     */
    const getFilmCards = (counter, films, container) => {
      for (let i = 0; i < counter; i++) {
        this.#renderFilmCard(films[i], container);
      }
    };

    /**
    * Render films boards or empty board
    */
    if (this.#films.length === 0) {
      render(new FilmsListEmptyView() , this.#mainListComponent.element);
    } else {
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
        Math.min(this.#films.length, this.#renderFilmCount ),
        this.#films,
        this.#mainListComponent.element.querySelector('.films-list__container')
      );

      if (this.#films.length > this.#renderFilmCount) {
        render(this.#loadMoreButtonComponent , this.#mainListComponent.element);
        this.#loadMoreButtonComponent.element.addEventListener('click', this.#onMoreButtonClick);
      }
    }


    /**
    * Render rated and commented films list
    */
    if(this.#films.length >= FilmsCounters.EXTRA ) {
      render(this.#ratedListComponent, this.#filmsComponent.element);
      getFilmCards(
        FilmsCounters.EXTRA,
        this.#films,
        this.#ratedListComponent.element.querySelector('.films-list__container')
      );
      render(this.#commentedListComponent, this.#filmsComponent.element);
      getFilmCards(
        FilmsCounters.EXTRA,
        this.#films,
        this.#commentedListComponent.element.querySelector('.films-list__container')
      );
    }
  };
}
