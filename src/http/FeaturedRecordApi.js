import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class FeaturedRecordApi {
  getData = () => GET('/featuredRecords', {});

  insertData = params => POST('/featuredRecords', params);

  modifyData = (id, params) => PUT(`/featuredRecords/${id}`, params);

  deleteData = id => DELETE(`/featuredRecords/${id}`, {});

  batchDeleteData = params => POST('/batchFeaturedRecords', params);
}

const featuredRecordApi = new FeaturedRecordApi();

export default featuredRecordApi;
