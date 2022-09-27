import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model';
import FilmsApiService from './api-services/films-api-service.js';
import CommentsApiService from './api-services/comments-api-service.js';

/**
 * Page variables
 */
const AUTHORIZATION = 'Basic fgjkfjsgbH5@LLPOY';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict/';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerStatisticsElement = bodyElement.querySelector('.footer__statistics');
const filmsModel = new FilmsModel( new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const filmsPresenter = new FilmsPresenter(bodyElement, mainElement, headerElement, footerStatisticsElement, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filmsModel, filterModel);

/**
 * Presenters
 */
filmsPresenter.init();
filterPresenter.init();
filmsModel.init();

