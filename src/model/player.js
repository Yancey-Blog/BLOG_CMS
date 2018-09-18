import {
  GET, PUT, POST, DELETE,
} from '../util/axios';


const PlayerModel = {};

PlayerModel.getPlayer = params => GET('/aplayers', params);

export default PlayerModel;
