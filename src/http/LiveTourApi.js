import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class LiveTourApi {
  getData = () => GET('/liveTours', {});

  insertData = params => POST('/liveTours', params);

  modifyData = (id, params) => PUT(`/liveTours/${id}`, params);

  deleteData = id => DELETE(`/liveTours/${id}`, {});

  batchDeleteData = params => POST('/batchLiveTours', params);
}

const liveTourApi = new LiveTourApi();

export default liveTourApi;
