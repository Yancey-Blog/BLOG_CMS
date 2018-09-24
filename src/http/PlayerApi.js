import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class PlayerApi {
  getData = () => GET('/players', {});

  insertData = params => POST('/players', params);

  modifyData = (id, params) => PUT(`/players/${id}`, params);

  showData = (id, params) => PUT(`/players/show/${id}`, params);

  deleteData = id => DELETE(`/players/${id}`, {});

  batchDeleteData = params => POST('/batchPlayers', params);
}

const playerApi = new PlayerApi();

export default playerApi;
