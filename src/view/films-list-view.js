import AbstractView from '../framework/view/abstract-view.js';

/**
 * Function for film list sections
 * @param {*} headingText - heading text
 * @param {*} extraClassName - section extra class
 * @param {*} visualClassName - heading visual class
 * @returns - markup template with heading for film list sections
 */
const createFilmsListTemplate = (
  headingText,
  extraClassName,
  visualClassName
) => `<section class="films-list ${extraClassName}"><h2 class="films-list__title ${visualClassName}">${headingText}</h2></section>`;

export default class FilmsListView extends AbstractView {
  #heading = null;
  #extraClassName = null;
  #visualClassName = null;

  constructor(heading, extraClassName, visualClassName) {
    super();
    this.#heading = heading;
    this.#extraClassName = extraClassName;
    this.#visualClassName = visualClassName;
  }

  get template() {
    return createFilmsListTemplate(this.#heading, this.#extraClassName, this.#visualClassName);
  }
}
