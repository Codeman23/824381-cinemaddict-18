import Observable from '../framework/observable.js';
import { generateComments } from '../mock/comment-mock';

export default class CommentsModel extends Observable {
  #filmsModel = null;
  #allComments = [];
  #comments = [];

  constructor(filmsModel) {
    super();
    this.#filmsModel = filmsModel;
    this.#generateAllComments();
  }

  #generateAllComments() {
    this.#allComments = generateComments(this.#filmsModel.get());
  }

  get = () => this.#allComments;

  add = (updateType, update) => {
    this.#allComments.push(update);
    this._notify(updateType, update);
  };

  delete = (updateType, update) => {
    const index = this.#allComments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#allComments = [
      ...this.#allComments.slice(0, index),
      ...this.#allComments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
