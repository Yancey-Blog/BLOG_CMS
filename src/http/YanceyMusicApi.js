import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class YanceyMusicApi {
  getData = () => GET('/yanceyMusic', {});

  insertData = params => POST('/yanceyMusic', params);

  modifyData = (id, params) => PUT(`/yanceyMusic/${id}`, params);

  deleteData = id => DELETE(`/yanceyMusic/${id}`, {});

  batchDeleteData = params => POST('/batchYanceyMusic', params);
}

const yanceyMusicApi = new YanceyMusicApi();

export default yanceyMusicApi;
