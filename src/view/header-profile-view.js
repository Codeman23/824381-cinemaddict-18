import AbstractView from '../framework/view/abstract-view.js';
import { UserStatuses, UserStatusGradations } from '../const.js';

const createHeaderProfileTemplate = (films) => {
  let statusInfo;
  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched);

  if (watchedFilms.length >= UserStatusGradations.MIN_NOVICE && watchedFilms.length <= UserStatusGradations.MAX_NOVICE) {
    statusInfo = UserStatuses.NOVICE;
  } else if (watchedFilms.length >= UserStatusGradations.MIN_FAN && watchedFilms.length <= UserStatusGradations.MAX_FAN) {
    statusInfo = UserStatuses.FAN;
  } else if (watchedFilms.length >= UserStatusGradations.MIN_MOVIE_BUFF) {
    statusInfo = UserStatuses.MOVIE_BUFF;
  } else {
    statusInfo = UserStatuses.NONE;
  }

  return `<section class="header__profile profile"><p class="profile__rating">${statusInfo}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"></section>`;
}

export default class HeaderProfileView extends AbstractView{
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createHeaderProfileTemplate(this.#films);
  }
}
