import dayjs from 'dayjs';
import {
  getRandomInteger,
  getRandomValueFromItems,
  formatValueToDate,
  formatValueToDateAndTime,
  formatMinutesToHoursAndMinutes,
} from '../util';
import { FilmsCounters } from '../const';
import {
  MAX_FILM_COMMENTS,
  GenreCount,
  Rating,
  AgeRating,
  Runtime,
  YearsDuration,
  DaysDuration,
  DescriptionSentences,
  names,
  surNames,
  titles,
  posters,
  genres,
  countres,
  descriptions,
  NAMES_COUNT,
} from '../mock/const-mock';

/**
 * Function that generate filmInfo properties
 * @returns filmInfo properties for one film
 */
const generateFilmInfo = () => ({
  title: getRandomValueFromItems(titles),
  alternativeTitle: getRandomValueFromItems(titles),
  totalRating: getRandomInteger(Rating.MIN, Rating.MAX),
  poster: getRandomValueFromItems(posters),
  ageRating: getRandomInteger(AgeRating.MIN, AgeRating.MAX),
  director: `${getRandomValueFromItems(names)} ${getRandomValueFromItems(surNames)}`,
  writers: Array.from(
    { length: NAMES_COUNT },
    () => `${getRandomValueFromItems(names)} ${getRandomValueFromItems(surNames)}`
  ).join(', '),
  actors: Array.from(
    { length: NAMES_COUNT },
    () => `${getRandomValueFromItems(names)} ${getRandomValueFromItems(surNames)}`
  ).join(', '),
  release: {
    date: formatValueToDate(dayjs().subtract(getRandomInteger(YearsDuration.MIN, YearsDuration.MAX), 'year').toDate()),
    releaseCountry: getRandomValueFromItems(countres),
  },
  runtime: formatMinutesToHoursAndMinutes(getRandomInteger(Runtime.MIN, Runtime.MAX)),
  genre: Array.from(
    { length: getRandomInteger(GenreCount.MIN, GenreCount.MAX) },
    () => `${getRandomValueFromItems(genres)}`
  ).join(', '),
  description: new Array(getRandomInteger(DescriptionSentences.MIN, DescriptionSentences.MAX))
    .fill('')
    .map(() => descriptions[getRandomInteger(DescriptionSentences.MIN, DescriptionSentences.MAX)])
    .join(' '),
});

/**
 * Function that generates films objects
 * @param {*} filmsCounter - films amount
 * @returns array of film objects
 */
const generateFilms = (filmsCounter = FilmsCounters.MAIN) => {
  const films = Array.from({ length: filmsCounter }, generateFilmInfo);
  let resultCommentsCount = 0;

  return films.map((film, index) => {
    const hasComments = getRandomInteger(0, 1);
    const commentsCount = hasComments ? getRandomInteger(1, MAX_FILM_COMMENTS) : 0;
    resultCommentsCount += commentsCount;

    return {
      id: String(index + 1),
      comments: hasComments
        ? Array.from({ length: commentsCount }, (_value, commentIndex) => String(resultCommentsCount - commentIndex))
        : [],
      filmInfo: film,
      userDetails: {
        watchlist: Boolean(getRandomInteger(0, 1)),
        alreadyWatched: Boolean(getRandomInteger(0, 1)),
        watchingDate: formatValueToDateAndTime(
          dayjs().subtract(getRandomInteger(DaysDuration.MIN, DaysDuration.MAX), 'date').toDate()
        ),
        favorite: Boolean(getRandomInteger(0, 1)),
      },
    };
  });
};

export { generateFilms };
