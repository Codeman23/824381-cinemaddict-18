const SectionHeadings = {
  ALL_MOVIES: 'All movies. Upcoming',
  RATED: 'Top rated',
  COMMENTED: 'Most commented',
};

const ExtraClassNames = {
  FILMS_LIST_EXTRA: 'films-list--extra',
  VISUALLY_HIDDEN: 'visually-hidden',
};

const FilmsCounters = {
  MAIN: 5,
  EXTRA: 2,
};

const MAX_DESCRIPTION_LENGHT = 139;

const FilterTypes = {
  ALL: 'All',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITE: 'Favorite',
};

const EmptyBordTextTypes = {
  [FilterTypes.ALL]: 'There are no movies in our database',
  [FilterTypes.WATCHLIST]: 'There are no movies to watch now',
  [FilterTypes.HISTORY]: 'There are no watched movies now',
  [FilterTypes.FAVORITE]: 'There are no favorite movies now',
};

const FilmModes = {
  DEFAULT: 'Default',
  POPUP: 'Popup',
};

const SortTypes = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const EmotionTypes = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};

const UserActions = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { SectionHeadings, ExtraClassNames, FilmsCounters, FilterTypes, EmptyBordTextTypes, MAX_DESCRIPTION_LENGHT, FilmModes, SortTypes, EmotionTypes, UserActions, UpdateTypes};
