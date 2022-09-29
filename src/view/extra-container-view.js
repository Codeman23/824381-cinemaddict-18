import AbstractView from '../framework/view/abstract-view.js';

const createExtraContainer = (titleText) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${titleText}</h2>
  </section>`
);

export default class ExtraContainerView extends AbstractView {

  constructor(titleText) {
    super();
    this.titleText = titleText;
  }

  get template() {
    return createExtraContainer(this.titleText);
  }

  get filmsListContainer() {
    return this.element.querySelector('.films-list__container');
  }
}
