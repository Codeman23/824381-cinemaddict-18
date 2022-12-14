import ApiService from '../framework/api-service.js';
import { Methods } from '../const.js';

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Methods.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    const adaptedFilm = {...film,
      'film_info' : {...film.filmInfo,
        'alternative_title': film.filmInfo.alternativeTitle,
        'total_rating': film.filmInfo.totalRating,
        'age_rating': film.filmInfo.ageRating,
      },
      'user_details' : {...film.userDetails,
        'already_watched' : film.userDetails.alreadyWatched,
        'watching_date' : film.userDetails.watchingDate instanceof Date ? film.userDetails.watchingDate.toISOString() : null,
      }
    };

    adaptedFilm['film_info'].release = {
      'date' : film.filmInfo.release.date instanceof Date ? film.filmInfo.release.date.toISOString() : null,
      'release_country' : film.filmInfo.release.releaseCountry,
    };

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;
    delete adaptedFilm['film_info'].alternativeTitle;
    delete adaptedFilm['film_info'].totalRating;
    delete adaptedFilm['film_info'].ageRating;
    delete adaptedFilm['user_details'].alreadyWatched;
    delete adaptedFilm['user_details'].watchingDate;

    return adaptedFilm;
  };
}
