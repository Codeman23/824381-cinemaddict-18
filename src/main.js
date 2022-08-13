import HeaderProfileView from './view/header-profile-view.js';
import FilterView from './view/filter-view.js';
import FooterStatistics from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmDetailsPresenter from './presenter/film-details-presenter.js';
import { render } from './render.js';

/**
 * Page variables
 */
const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');
const footerStatisticsElement = footerElement.querySelector('.footer__statistics');
const filmsPresenter = new FilmsPresenter();
const filmDetailsPresenter = new FilmDetailsPresenter();

/**
 * Render markup
 */
render(new HeaderProfileView(), headerElement);
render(new FilterView(), mainElement);
render(new FooterStatistics(), footerStatisticsElement);

/**
 * Presenters
 */
filmsPresenter.init(mainElement);
filmDetailsPresenter.init(footerElement);
