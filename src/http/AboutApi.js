import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class AboutApi {
  getData = () => GET('/abouts', {});

  insertData = params => POST('/abouts', params);

  modifyData = (id, params) => PUT(`/abouts/${id}`, params);

  deleteData = id => DELETE(`/abouts/${id}`, {});

  batchDeleteData = params => POST('/batchAbouts', params);
}

const aboutApi = new AboutApi();

export default aboutApi;
