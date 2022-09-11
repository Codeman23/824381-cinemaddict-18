/**
 * Constants for mock data
 */
const NAMES_COUNT = 2;

const MAX_FILM_COMMENTS = 5;

const GenreCount = {
  MIN: 1,
  MAX: 3,
};

const Rating = {
  MIN: 0,
  MAX: 10,
};

const AgeRating = {
  MIN: 0,
  MAX: 18,
};

const Runtime = {
  MIN: 60,
  MAX: 180,
};

const YearsDuration = {
  MIN: 5,
  MAX: 10,
};

const DaysDuration = {
  MIN: 1,
  MAX: 7,
};

const MonthDuration = {
  MIN: 1,
  MAX: 9,
};

const DescriptionSentences = {
  MIN: 2,
  MAX: 5,
};

const FilmsCount = {
  MIN: 15,
  MAX: 20,
};

const names = [
  'Robert',
  'Jack',
  'Marlon',
  'Denzel',
  'Katharine',
  'Humphrey',
  'Meryl',
  'Daniel',
  'Sidney',
  'Clark',
  'Ingrid',
  'Tom',
  'Elizabeth',
  'Bette',
  'Gregory',
];

const surNames = [
  'De Niro',
  'Nicholson',
  'Brando',
  'Washington',
  'Hepburn',
  'Bogart',
  'Streep',
  'Day-Lewis',
  'Poitier',
  'Gable',
  'Bergman',
  'Hanks',
  'Taylor',
  'Davis',
  'Peck',
];

const titles = [
  'Reservoir Dogs',
  'Groundhog Day',
  'Paddington 2',
  'Amelie',
  'Donnie Darko',
  'Scott Pilgrim Vs. The World',
  'Portrait Of A Lady On Fire',
  'Léon',
  'Logan',
  'The Terminator',
  'No Country For Old Men',
  'The Exorcist',
  'Shaun Of The Dead',
  'Lost In Translation',
  'Thor: Ragnarok',
];

const posters = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-dance-of-life.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
];

const genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Western'];

const countres = [
  'Afghanistan',
  'Albania',
  'Bangladesh',
  'Belarus',
  'Cameroon',
  'China',
  'Egypt',
  'Ethiopia',
  'Guatemala',
  'Honduras',
  'Iceland',
  'Iran',
  'Jamaica',
  'Kazakhstan',
  'Kyrgyzstan',
];

const emotions = ['angry', 'puke', 'smile', 'sleeping'];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

const comments = ['Good cast and film', 'Not so good', 'Awesoooooome. Ahhh', 'Almost 3 hours? So long and boring'];


export {
  NAMES_COUNT,
  MAX_FILM_COMMENTS,
  FilmsCount,
  GenreCount,
  Rating,
  AgeRating,
  Runtime,
  YearsDuration,
  DaysDuration,
  MonthDuration,
  DescriptionSentences,
  names,
  surNames,
  titles,
  posters,
  genres,
  countres,
  emotions,
  descriptions,
  comments,
};
