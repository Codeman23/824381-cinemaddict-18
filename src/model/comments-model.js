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

  add = (update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];
    this.#allComments.push(update);
  };
}
