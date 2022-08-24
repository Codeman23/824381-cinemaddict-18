import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatistics = () => '<p>130 291 movies inside</p>';

export default class FooterStatistics extends AbstractView{
  get template() {
    return createFooterStatistics();
  }
}
