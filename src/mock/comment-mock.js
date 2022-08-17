import dayjs from 'dayjs';
import { getRandomInteger, getRandomValueFromItems, formatValueToDateAndTime } from '../util';
import { DaysDuration, names, surNames, emotions, comment } from '../mock/const-mock';

/**
 * Function that generate one comment properties
 * @returns comment properties
 */
const generateComment = () => ({
  author: `${getRandomValueFromItems(names)} ${getRandomValueFromItems(surNames)}`,
  comment,
  date: formatValueToDateAndTime(
    dayjs().subtract(getRandomInteger(DaysDuration.MIN, DaysDuration.MAX), 'date').toDate()
  ),
  emotion: getRandomValueFromItems(emotions),
});

/**
 * Function that amount comments
 * @param {*} films - array of films
 * @returns - comments amount
 */
const getCommentsAmount = (films) => films.reduce((count, film) => count + film.comments.length, 0);

/**
 * Function that generate comments
 * @param {*} films - array of films
 * @returns array of comments objects
 */
const generateComments = (films) => {
  const commentsCounter = getCommentsAmount(films);

  return Array.from({ length: commentsCounter }, (_value, index) => {
    const commentProperties = generateComment();
    return {
      id: String(index + 1),
      ...commentProperties,
    };
  });
};

export { generateComments };
