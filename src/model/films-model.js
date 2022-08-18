import { generateFilms } from '../mock/film-mock';

export default class FilmsModel {
  films = generateFilms();
  get = () => this.films;
}
