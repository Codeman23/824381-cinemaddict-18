import { RenderPositions } from './const';

/**
 * Helper function for generate markup
 * @param {*} template - markup temaplate
 * @returns - markup
 */
const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

/**
 * Helper function for rendering markup template
 * @param {*} component - new markup
 * @param {*} container - container for new markup
 * @param {*} place - render method
 */
const render = (component, container, place = RenderPositions.BEFOREEND) => {
  container.insertAdjacentElement(place, component.getElement());
};

export { createElement, render };
