import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class ArticleApi {
  getData = () => GET('/articles', {});

  getDataByPage = page => GET(`/articles/page/${page}`, {});

  getDataByTitle = title => GET(`/articlesByTitle?title=${title}`, {});

  getDataByDay = () => GET('/articlesByDay', {});

  getDataByPV = () => GET('/articlesByPV', {});

  getDataByDateRange = (start, end) => GET(`/articlesByDateRange?start=${start}&end=${end}`, {});

  getDataById = id => GET(`articles/${id}`, {});

  insertData = params => POST('/articles', params);

  modifyData = (id, params) => PUT(`/articles/${id}`, params);

  switchStatus = (id, params) => PUT(`/articleStatus/${id}`, params);

  deleteData = id => DELETE(`/articles/${id}`, {});

  batchDeleteData = params => POST('/batchArticles', params);
}

const articleApi = new ArticleApi();

export default articleApi;
