import { GET, POST, PUT } from '../util/axios';

class GlobalApi {
  getData = () => GET('/globalStatus', {});

  insertFullSiteGrayData = params => POST('/fullSiteGray', params);

  modifyFullSiteGrayData = (id, params) => PUT(`/fullSiteGray/${id}`, params);
}

const globalApi = new GlobalApi();

export default globalApi;
