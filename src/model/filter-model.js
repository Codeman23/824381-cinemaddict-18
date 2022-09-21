import Observable from '../framework/observable.js';
import {FilterTypes} from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterTypes.ALL;

  get = () => this.#filter;

  set = (updateType, update) => {
    this.#filter = update;
    this._notify(updateType, update);
  };
}
