import { GET, POST, PUT } from '../util/axios';

class UserInfoApi {
  getData = () => GET('/userInfo', {});

  insertData = params => POST('/userInfo', params);

  modifyData = (id, params) => PUT(`/userInfo/${id}`, params);
}

const userInfoApi = new UserInfoApi();

export default userInfoApi;
