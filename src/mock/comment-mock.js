import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { getRandomInteger, getRandomValueFromItems } from '../util';
import { DaysDuration, MonthDuration, names, surNames, emotions, comments } from '../mock/const-mock';

dayjs.extend(relativeTimePlugin);

/**
 * Function that generate one comment properties
 * @returns comment properties
 */
const generateComment = () => ({
  author: `${getRandomValueFromItems(names)} ${getRandomValueFromItems(surNames)}`,
  comment: getRandomValueFromItems(comments),
  date: dayjs().to(`${dayjs().year()}-${getRandomInteger(MonthDuration.MIN, MonthDuration.MAX)}-${getRandomInteger(DaysDuration.MIN, DaysDuration.MAX)}`),
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
