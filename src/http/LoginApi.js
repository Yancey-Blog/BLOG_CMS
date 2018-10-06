import { POST } from '../util/axios';

class LoginApi {
  login = params => POST('/login', params);

  modifyPassword = params => POST('/modifyPassword', params);
}

const loginApi = new LoginApi();

export default loginApi;
