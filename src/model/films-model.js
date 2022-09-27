import ObservableModel from '../framework/observable-model.js';
import {UpdateTypes} from '../const.js';

export default class CommentsModel extends ObservableModel {
  #filmsApiService = null;
  #films = [];

  constructor(filmsApiService){
    super();
    this.#filmsApiService = filmsApiService;
  }

  get = () => this.#films;

  init = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this._adaptFilmToClient);
    } catch(err) {
      this.#films = [];
    }

    this._notify(UpdateTypes.INIT);
  };

  updateFilm = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    try {
      const response = await this.#filmsApiService.updateFilm(update);
      const updatedFilm = this._adaptFilmToClient(response);

      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1),
      ];

      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t update film');
    }
  };
}
