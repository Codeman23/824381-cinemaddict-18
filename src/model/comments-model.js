import ObservableModel from '../framework/observable-model.js';

export default class CommentsModel extends ObservableModel {
  #commentsApiService = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get = () => this.#comments;

  init = async (film) => {
    try {
      const comments = await this.#commentsApiService.getComments(film);
      this.#comments = comments.map(this.#adaptCommentToClient);
    } catch(err) {
      this.#comments = [];
    }
  };

  addComment = async (updateType, filmId, comment) => {
    try {
      const response = await this.#commentsApiService.addComment(filmId, comment);
      const updatedFilm = this._adaptFilmToClient(response.movie);
      this.#comments = response.comments.map((item) => this.#adaptCommentToClient(item));

      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (updateType, updatedFilm, commentId) => {
    const index = this.#comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(commentId);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };

  #adaptCommentToClient = (comment) => {
    const adaptedComment = {...comment};
    adaptedComment.date = adaptedComment.date !== null ? new Date(adaptedComment.date) : adaptedComment.date;

    return adaptedComment;
  };

  #adaptFilmToClient = (film) => {
    const adaptedFilm = {...film,
      filmInfo : {...film.film_info,
        alternativeTitle: film.film_info.alternative_title,
        totalRating: film.film_info.total_rating,
        ageRating: film.film_info.age_rating,
      },
      userDetails : {...film.user_details,
        alreadyWatched : film.user_details.already_watched,
        watchingDate : film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date,
      }
    };

    adaptedFilm.filmInfo.release = {
      date : film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
      releaseCountry : film.film_info.release.release_country,
    };

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;
    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.total_rating;
    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;

    return adaptedFilm;
  };
}
