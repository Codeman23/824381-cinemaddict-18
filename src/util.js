import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import {FilterTypes} from './const.js';

dayjs.extend(duration);
dayjs.extend(relativeTime);

/**
 * Helper function that returns random number from specified range value
 * @param {*} a - min range value
 * @param {*} b - max range value
 * @returns - random number
 */
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * Helper function that returns random value from items
 * @param {*} items - iterrable collection
 * @returns - random item form items
 */
const getRandomValueFromItems = (items) => items[getRandomInteger(0, items.length - 1)];

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
const formatMinutesToHoursAndMinutes = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

/**
 * Filter navigation counters
 */
const filters = {
  [FilterTypes.WATCHLIST] : (items) => items.filter((item) => item.watchlist === true),
  [FilterTypes.HISTORY] : (items) => items.filter((item) => item.alreadyWatched === true),
  [FilterTypes.FAVORITE] : (items) => items.filter((item) => item.favorite === true),
};

/**
 * Function that update film data
 * @param {*} items - films data
 * @param {*} update - new data
 * @returns - updated data
 */
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return items;
  }
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {
  getRandomInteger,
  getRandomValueFromItems,
  formatValueToDateAndTime,
  formatValueToDate,
  formatValueToYear,
  formatMinutesToHoursAndMinutes,
  filters,
  updateItem,
};
