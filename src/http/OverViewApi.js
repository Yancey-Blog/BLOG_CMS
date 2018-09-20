import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class OverViewApi {
  getServerData = () => GET('https://api.64clouds.com/v1/getLiveServiceInfo?veid=668751&api_key=private_HFFGocLNLN6TzcGjo41d7BD0', {});

  insertData = params => POST('/covers', params);

  modifyData = (id, params) => PUT(`/covers/${id}`, params);

  showData = (id, params) => PUT(`/covers/show/${id}`, params);

  deleteData = id => DELETE(`/covers/${id}`, {});

  batchDeleteData = params => POST('/batchCovers', params);
}

const overViewApi = new OverViewApi();

export default overViewApi;
