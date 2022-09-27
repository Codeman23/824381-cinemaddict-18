import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import {FilterTypes, KeyboardKeys} from './const.js';

dayjs.extend(duration);
dayjs.extend(relativeTime);

/**
 * Helper function that conver string value like 2022-05-11T00:00:00.000Z to 2022/05/11 03:00
 * @param {*} date - string value
 * @returns - date and time format like 2022/05/11 03:00
 */
const formatValueToDateAndTime = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');

/**
 * Helper function that convert string value 2022-05-11 to 11 May 2022
 * @param {*} date - string value
 * @returns - date format like 11 May 2022
 */
const formatValueToDate = (date) => dayjs(date).format('DD MMMM YYYY');

/**
 * Helper function that convert any date format with year example(2022-05-11) to year 2022
 * @param {*} date - string value
 * @returns - date format like 2022
 */
const formatValueToYear = (date) => dayjs(date).format('YYYY');

/**
 * Helper function that convert minutes value to hours-and-minutes format ( 130 -> 2h 10m)
 * @param {*} minutes - minutes value
 * @returns - hour-and-minutes format like '2h 10m'
 */
const formatMinutesToHoursAndMinutes = (minutes) => minutes > 60 ? dayjs.duration(minutes, 'minutes').format('H[h] mm[m]') : dayjs.duration(minutes, 'minutes').format('mm[m]');

/**
 * Filter navigation counters
 */
const filters = {
  [FilterTypes.ALL]: (items) => items.slice(),
  [FilterTypes.WATCHLIST]: (items) => items.filter((item) => item.userDetails.watchlist === true),
  [FilterTypes.HISTORY]: (items) => items.filter((item) => item.userDetails.alreadyWatched === true),
  [FilterTypes.FAVORITE]: (items) => items.filter((item) => item.userDetails.favorite === true),
};

/**
 * Function that putt films with no data to the end of the list
 * @param {*} dateA - film data
 * @param {*} dateB - film data
 * @returns - sorted films data
 */
const getFilmWithNoData = (dateA, dateB) => {
  if (dateA === null && dateB === null){
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }
  return null;
};

/**
 * Function that sorts a films by newest date
 * @param {*} filmA - film date data
 * @param {*} filmB - film date data
 * @returns sorted films by date
 */
const sortFilmUp = (filmA, filmB) => {
  const filmWithNoData = getFilmWithNoData (filmA.filmInfo.release.date, filmB.filmInfo.release.date);
  return filmWithNoData ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

/**
 * Function that sorts a films by the rating value
 * @param {*} filmA - film rating data
 * @param {*} filmB - film rating data
 * @returns sorted films by rating
 */
const sortRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

/**
 * Function that determines key press
 * @param {*} evt - event
 * @returns - return boolean
 */
const pressCtrlEnter = (evt) => evt.key === KeyboardKeys.ENTER && (evt.ctrlKey || evt.metaKey);

export {
  formatValueToDateAndTime,
  formatValueToDate,
  formatValueToYear,
  formatMinutesToHoursAndMinutes,
  filters,
  sortFilmUp,
  sortRating,
  pressCtrlEnter
};
