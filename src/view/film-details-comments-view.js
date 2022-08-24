import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsComments = (comments) => `
<div class="film-details__bottom-container">
<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">
  ${comments.length}</span></h3>
  <ul class="film-details__comments-list">
  ${comments
    .map(
      (comment) =>
        `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${comment.date}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`
    )
    .join('')}
  </ul>
</section>
</div>`;

export default class FilmDetailsCommentsView extends AbstractView{
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsComments(this.#comments);
  }
}
