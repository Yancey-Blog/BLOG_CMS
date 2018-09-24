import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class MottoApi {
  getData = () => GET('/mottoes', {});

  insertData = params => POST('/mottoes', params);

  modifyData = (id, params) => PUT(`/mottoes/${id}`, params);

  deleteData = id => DELETE(`/mottoes/${id}`, {});

  batchDeleteData = params => POST('/batchMottoes', params);
}

const mottoApi = new MottoApi();

export default mottoApi;
