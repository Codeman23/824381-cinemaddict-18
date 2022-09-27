import Observable from '../framework/observable.js';

export default class ObservableModel extends Observable {
  _adaptFilmToClient = (film) => {
    const adaptedFilm = {...film,
      filmInfo : {...film.film_info,
        alternativeTitle: film.film_info.alternative_title,
        totalRating: film.film_info.total_rating,
        ageRating: film.film_info.age_rating,
      },
      userDetails : {...film.user_details,
        alreadyWatched : film.user_details.already_watched,
        watchingDate : film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date,
      }
    };

    adaptedFilm.filmInfo.release = {
      date : film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
      releaseCountry : film.film_info.release.release_country,
    };

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;
    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.total_rating;
    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;

    return adaptedFilm;
  };
}
