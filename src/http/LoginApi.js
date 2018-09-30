import { POST } from '../util/axios';

class LoginApi {
  login = params => POST('/login', params);
}

const loginApi = new LoginApi();

export default loginApi;
