import ApiService from '../framework/api-service.js';
import { Methods } from '../const.js';

export default class CommentsApiService extends ApiService {

  getComments = (film) => this._load({url: `comments/${film.id}`}).then(ApiService.parseResponse);

  addComment = async (film, comment) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Methods.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };

  deleteComment = async (commentId) => {
    await this._load({
      url: `comments/${commentId}`,
      method: Methods.DELETE,
    });
  };
}
