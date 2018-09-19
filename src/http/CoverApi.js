import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class CoverApi {
  getData = () => GET('/covers', {});

  insertData = params => POST('/covers', params);

  modifyData = (id, params) => PUT(`/covers/${id}`, params);

  showData = (id, params) => PUT(`/covers/show/${id}`, params);

  deleteData = id => DELETE(`/covers/${id}`, {});

  batchDeleteData = params => POST('/batchCovers', params);
}

const coverApi = new CoverApi();

export default coverApi;
