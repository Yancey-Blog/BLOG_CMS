import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class ArticleApi {
  getData = () => GET('/articles', {});

  getDataById = id => GET(`articles/${id}`, {});

  insertData = params => POST('/articles', params);

  modifyData = (id, params) => PUT(`/articles/${id}`, params);

  deleteData = id => DELETE(`/articles/${id}`, {});

  batchDeleteData = params => POST('/batchArticles', params);
}

const articleApi = new ArticleApi();

export default articleApi;
