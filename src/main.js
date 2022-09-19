import HeaderProfileView from './view/header-profile-view.js';
import FooterStatistics from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model';
import {render} from './framework/render.js';

/**
 * Page variables
 */
const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerStatisticsElement = bodyElement.querySelector('.footer__statistics');
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const filterModel = new FilterModel();
const filmsPresenter = new FilmsPresenter(mainElement, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filmsModel, filterModel);

/**
 * Render markup
 */
render(new HeaderProfileView(), headerElement);
render(new FooterStatistics(filmsModel), footerStatisticsElement);

/**
 * Presenters
 */
filmsPresenter.init();
filterPresenter.init();
