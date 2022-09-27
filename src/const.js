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

const PopupModes = {
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
  INIT: 'INIT',
};

const KeyboardKeys = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const UserStatuses = {
  NONE: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff'
};

const UserStatusGradations = {
  MIN_NOVICE: 1,
  MAX_NOVICE : 10,
  MIN_FAN: 11,
  MAX_FAN: 20,
  MIN_MOVIE_BUFF: 21,
}

const SHAKE_CLASS_NAME = 'shake';

const SHAKE_ANIMATION_TIMEOUT = 600;

const UiBlockerTimeLimits = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const Methods = {
  PUT: 'PUT',
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

export { SectionHeadings,
  ExtraClassNames,
  FilmsCounters,
  FilterTypes,
  EmptyBordTextTypes,
  MAX_DESCRIPTION_LENGHT,
  SortTypes,
  EmotionTypes,
  UserActions,
  UpdateTypes,
  KeyboardKeys,
  PopupModes,
  UserStatuses,
  UserStatusGradations,
  SHAKE_CLASS_NAME,
  SHAKE_ANIMATION_TIMEOUT,
  UiBlockerTimeLimits,
  Methods};
