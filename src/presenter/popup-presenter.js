import FilmDetailsView from '../view/film-details-view.js';
import { UserActions, UpdateTypes, KeyboardKeys } from '../const.js';
import { render, replace, remove } from '../framework/render.js';

export default class PopupPresenter {
  #mainContainer = null;
  #scrollPosition = 0;
  #popupFilm = null;
  #changeData = null;
  #controlButtonChange = null;
  #filmDetailsComponent = null;
  #commentsModel = null;

  constructor (filmsContainer, commentsModel, changeData, controlButtonChange) {
    this.#mainContainer = filmsContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#controlButtonChange = controlButtonChange;
  }

  init = async (film) => {
    this.#popupFilm = film;

    await this.#commentsModel.init(this.#popupFilm);

    if (this.#filmDetailsComponent) {
      this.#scrollPosition = this.#filmDetailsComponent.element.scrollTop;
    }

    const prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.#filmDetailsComponent = new FilmDetailsView(this.#popupFilm, this.#commentsModel.get());

    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#removeFilmDetails);
    this.#filmDetailsComponent.setControlButtonClickHandler(this.#controlButtonChange);
    this.#filmDetailsComponent.setCommentAddHandler(this.#handleCommentAddClick);
    this.#filmDetailsComponent.setCommentDeleteHandler(this.#handleCommentDeleteClick);

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscapeKey);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#mainContainer);
      return;
    }

    if (this.#mainContainer.parentElement.contains(prevFilmDetailsComponent.element)) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent );
    }

    this.#filmDetailsComponent.element.scrollTop = this.#scrollPosition;

    remove(prevFilmDetailsComponent);
  };

  setAborting = (actionType) => {
    let resetFormState;

    switch (actionType) {
      case UserActions.UPDATE_FILM:
        resetFormState = () => {
          this.#filmDetailsComponent.updateElement({
            isDisabled: false
          });
        };
        this.#filmDetailsComponent.setButtonsShake(resetFormState);
        break;
      case UserActions.ADD_COMMENT:
        resetFormState = () => {
          this.#filmDetailsComponent.updateElement({
            isSaving: false
          });
        };
        this.#filmDetailsComponent.setFormShake(resetFormState);
        break;
      case UserActions.DELETE_COMMENT:
        resetFormState = () => {
          this.#filmDetailsComponent.updateElement({
            isDeleting: false
          });
        };
        this.#filmDetailsComponent.setDeleteButtonShake(resetFormState);
        break;
    }
  };

  setPopupUpdate = (actionType, update) => {
    switch (actionType) {
      case UserActions.UPDATE_FILM:
        this.#filmDetailsComponent.updateElement({
          userDetails: update.userDetails,
          isDisabled: false
        });
        break;
      case UserActions.ADD_COMMENT:
        this.#filmDetailsComponent.updateElement({
          popupComments: this.#commentsModel.get(),
          description: '',
          checkedEmotion: false,
          isSaving: false,
        });
        break;
      case UserActions.DELETE_COMMENT:
        this.#filmDetailsComponent.updateElement({
          popupComments: this.#commentsModel.get(),
          isDeleting: false,
        });
        break;
    }
  };

  resetView = () => {
    this.#removeFilmDetails();
  };

  #handleCommentAddClick = (filmId, comment) => {
    this.#changeData(
      UserActions.ADD_COMMENT,
      UpdateTypes.PATCH,
      filmId,
      comment
    );
  };

  #handleCommentDeleteClick = (commentId) => {
    this.#changeData(
      UserActions.DELETE_COMMENT,
      UpdateTypes.PATCH,
      { ...this.#popupFilm, comments: this.#popupFilm.comments.filter((comment) => comment !== commentId)},
      commentId
    );
  };

  #removeFilmDetails = () => {
    document.body.classList.remove('hide-overflow');
    remove(this.#filmDetailsComponent);
    document.removeEventListener('keydown', this.#onEscapeKey);
  };

  #onEscapeKey = (evt) => {
    if(evt.key === KeyboardKeys.ESCAPE || evt.key === KeyboardKeys.ESC) {
      evt.preventDefault();
      this.#removeFilmDetails();
    }
  };
}
