import HeaderProfileView from '../view/header-profile-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ExtraContainerView from '../view/extra-container-view.js';
import ButtonMoreView from '../view/button-more-view.js';
import FilmsListEmptyView from '../view/films-list-empty-view.js';
import FilmPresenter from './film-presenter.js';
import PopupPresenter from './popup-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { SectionHeadings, FilmsCounters, SortTypes, UserActions, UpdateTypes, FilterTypes, PopupModes, UiBlockerTimeLimits} from '../const.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { sortFilmUp, sortRating, sortComments, filters } from '../util.js';

export default class FilmsPresenter {
  #headerProfileContainer = null;
  #footerStatisticsContainer = null;
  #popupContainer = null;
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #headerProfileComponent = null;
  #footerStatisticsComponent = null;
  #sortComponent = null;
  #filmsComponent = new FilmsView();
  #filmListEmptyComponent = null;
  #loadingComponent = new LoadingView();
  #mainListComponent = new FilmsListView(SectionHeadings.ALL_MOVIES);
  #topRatedContainer = new ExtraContainerView(SectionHeadings.RATED);
  #mostCommentedContainer = new ExtraContainerView(SectionHeadings.COMMENTED);
  #mainListContainerComponent = new FilmsListContainerView();
  #ratedListContainerComponent = new FilmsListContainerView();
  #commentedListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ButtonMoreView();
  #renderFilmCount = FilmsCounters.MAIN;
  #addedFilmsPresenter = new Map();
  #topRatedPresenter = new Map();
  #mostCommentedPresenter = new Map();
  #filterType = FilterTypes.ALL;
  #currentSortType = SortTypes.DEFAULT;
  #isLoading = true;
  #uiBlocker = new UiBlocker(UiBlockerTimeLimits.LOWER_LIMIT, UiBlockerTimeLimits.UPPER_LIMIT);
  #popupMode = PopupModes.DEFAULT;
  #popupComponent = null;

  constructor (popupContainer, filmsContainer, headerContainer, footerContainer, filmsModel, commentsModel, filterModel) {
    this.#popupContainer = popupContainer;
    this.#filmsContainer = filmsContainer;
    this.#headerProfileContainer = headerContainer;
    this.#footerStatisticsContainer = footerContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
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

  init = () => {
    this.#renderFilmsBoard();
  };

  #handleMoreButtonClick = () => {
    this.films.slice(this.#renderFilmCount, this.#renderFilmCount + FilmsCounters.MAIN).forEach((film) => this.#renderFilmCard(film, this.#mainListContainerComponent.element));
    this.#renderFilmCount += FilmsCounters.MAIN;

    if(this.#renderFilmCount >= this.films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleViewAction = async (actionType, updateType, update, comment) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserActions.UPDATE_FILM:
        try {
          if (this.#filterType !== FilterTypes.ALL) {
            updateType = UpdateTypes.MINOR;
          }

          await this.#filmsModel.updateFilm(updateType, update);
          remove(this.#headerProfileComponent);
          this.#renderHeaderProfile();

          if (this.#popupMode === PopupModes.POPUP) {
            this.#popupComponent.setPopupUpdate(actionType, update);
          }
        } catch(err) {
          if (this.#popupMode === PopupModes.POPUP) {
            this.#popupComponent.setAborting(actionType);
          }
          this.#addedFilmsPresenter.get(update.id).setAborting();
        }
        break;
      case UserActions.ADD_COMMENT:
        try {
          await this.#commentsModel.addComment(updateType, update, comment);
          await this.#filmsModel.updateFilm(updateType, update);
          this.#popupComponent.setPopupUpdate(actionType);
        } catch(err) {
          this.#popupComponent.setAborting(actionType);
        }
        break;
      case UserActions.DELETE_COMMENT:
        try {
          await this.#commentsModel.deleteComment(updateType, update, comment);
          await this.#filmsModel.updateFilm(updateType, update);
          this.#popupComponent.setPopupUpdate(actionType);
        } catch(err) {
          this.#popupComponent.setAborting(actionType);
        }
        break;}

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = async (updateType, data) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        if (this.#addedFilmsPresenter.has(data.id)) {
          await this.#addedFilmsPresenter.get(data.id).init(data);
        }
        this.#renderTopFilmList({removeContainer: true});
        this.#renderMostCommentedFilms({removeContainer: true});
        break;
      case UpdateTypes.MINOR:
        if (this.#popupMode === PopupModes.POPUP) {
          this.#popupComponent.init(data);
        }
        this.#clearFilmsBoard();
        this.#renderFilmsBoard();
        break;
      case UpdateTypes.MAJOR:
        this.#clearFilmsBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderFilmsBoard();
        break;
      case UpdateTypes.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderFilmsBoard();
        break;
    }
  };

  #handleOpenPopup = (film) => {
    if (this.#popupMode === PopupModes.POPUP) {
      this.#popupComponent.resetView();
    }

    if (this.#popupMode === PopupModes.DEFAULT) {
      this.#popupMode = PopupModes.POPUP;
    }

    this.#popupComponent = new PopupPresenter(this.#popupContainer, this.#commentsModel, this.#handleViewAction, this.#handleControlButtonClick);
    this.#popupComponent.init(film);
  };

  #handleControlButtonClick = (update) => {
    this.#handleViewAction(
      UserActions.UPDATE_FILM,
      UpdateTypes.PATCH,
      update
    );
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#mainListComponent.element);
  };

  #renderHeaderProfile = () => {
    this.#headerProfileComponent = new HeaderProfileView(this.#filmsModel.get());
    render(this.#headerProfileComponent, this.#headerProfileContainer);
  };

  #renderFooterStatistics = () => {
    this.#footerStatisticsComponent = new FooterStatisticsView(this.#filmsModel.get().length);
    render(this.#footerStatisticsComponent, this.#footerStatisticsContainer);
  };

  #clearFilmsBoard = ({resetRenderedTaskCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#addedFilmsPresenter.forEach((presenter) => presenter.destroy());
    this.#addedFilmsPresenter.clear();
    this.#topRatedPresenter.forEach((presenter) => presenter.destroy());
    this.#topRatedPresenter.clear();
    this.#mostCommentedPresenter.forEach((presenter) => presenter.destroy());
    this.#mostCommentedPresenter.clear();

    remove(this.#headerProfileComponent);
    remove(this.#sortComponent);
    remove(this.#showMoreButtonComponent);
    remove(this.#footerStatisticsComponent);

    if (this.#filmListEmptyComponent) {
      remove(this.#filmListEmptyComponent);
    }

    if (resetRenderedTaskCount) {
      this.#renderFilmCount = FilmsCounters.MAIN;
    } else {
      this.#renderFilmCount = Math.min(filmCount, this.#renderFilmCount);
    }

    if (filmCount === 0) {
      this.#renderFilmCount = FilmsCounters.MAIN;
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
    render(this.#sortComponent, this.#filmsContainer, RenderPosition.BEFOREBEGIN);
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

  #renderFilmCard = (film) => {
    const filmPresenter = new FilmPresenter(this.#mainListContainerComponent, this.#handleControlButtonClick, this.#handleOpenPopup);
    filmPresenter.init(film);
    this.#addedFilmsPresenter.set(film.id, filmPresenter);
  };

  #renderFilmCards = (films, container) => {
    films.forEach((film) => this.#renderFilmCard(film, container));
  };

  #renderTopFilmList = ({removeContainer = false} = {}) => {
    const sortedFilms = this.#filmsModel.get().sort(sortRating).slice(0, 2).filter((item) => item.filmInfo.totalRating > 1);

    if (removeContainer) {
      remove(this.#topRatedContainer);
      remove(this.#ratedListContainerComponent);
    }

    if (sortedFilms.length === 0) {
      return;
    }

    if (this.#topRatedPresenter.length > 0) {
      this.#topRatedPresenter.forEach((presenter) => presenter.destroy());
      this.#topRatedPresenter.clear();
    }

    render(this.#topRatedContainer, this.#filmsComponent.element);
    render(this.#ratedListContainerComponent, this.#topRatedContainer.element);

    for (const film of sortedFilms) {
      const filmCardPresenter = new FilmPresenter(this.#ratedListContainerComponent, this.#handleControlButtonClick, this.#handleOpenPopup);
      filmCardPresenter.init(film);
      this.#topRatedPresenter.set(film.id, filmCardPresenter);
    }
  };

  #renderMostCommentedFilms = ({removeContainer = false} = {}) => {
    const sortedFilms = this.#filmsModel.get().sort(sortComments).slice(0, 2).filter((item) => item.comments.length > 0);

    if (removeContainer) {
      remove(this.#mostCommentedContainer);
      remove(this.#commentedListContainerComponent);
    }

    if (sortedFilms.length === 0) {
      return;
    }

    render(this.#mostCommentedContainer, this.#filmsComponent.element);
    render(this.#commentedListContainerComponent, this.#mostCommentedContainer.element);

    if (this.#mostCommentedPresenter > 0) {
      this.#mostCommentedPresenter.forEach((presenter) => presenter.destroy());
      this.#mostCommentedPresenter.clear();
    }

    for (const film of sortedFilms) {
      const filmCardPresenter = new FilmPresenter(this.#commentedListContainerComponent, this.#handleControlButtonClick, this.#handleOpenPopup);
      filmCardPresenter.init(film);
      this.#mostCommentedPresenter.set(film.id, filmCardPresenter);
    }
  };

  #renderFilmsBoard = () => {
    const filmCount = this.films.length;

    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#mainListComponent, this.#filmsComponent.element);
    render(this.#mainListContainerComponent, this.#mainListComponent.element);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (filmCount === 0) {
      this.#renderFilmsListEmpty();
      return;
    }

    this.#renderHeaderProfile();
    this.#renderSort();
    this.#renderFilmCards(this.films.slice(0, Math.min(filmCount, this.#renderFilmCount)), this.#mainListContainerComponent.element);

    if (filmCount > this.#renderFilmCount) {
      this.#renderShowMoreButton();
    }

    this.#renderTopFilmList();
    this.#renderMostCommentedFilms();
    this.#renderFooterStatistics();
  };
}
