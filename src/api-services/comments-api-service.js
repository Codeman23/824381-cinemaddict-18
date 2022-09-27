import ApiService from '../framework/api-service.js';
import { Methods } from '../const.js';

export default class CommentsApiService extends ApiService {

  getComments = (film) => this._load({url: `comments/${film.id}`}).then(ApiService.parseResponse);

  addComment = async (filmId, comment) => {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Methods.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async (commentId) => {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Methods.DELETE,
    });

    return response;
  };
}
