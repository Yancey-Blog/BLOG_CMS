import { action, observable, configure } from 'mobx';
import querystring from 'querystring';
import { message } from 'antd/lib/index';
import { loginApi } from '../http/index';

configure({
  strict: 'always',
});

class LoginStore {
  @observable email;

  @observable password;

  @observable captcha;

  constructor() {
    this.loginApi = loginApi;
    this.email = '';
    this.password = '';
    this.captcha = '';
  }

  login = async () => {
    const params = {
      id: this.email,
      pwd: this.password,
      response: this.captcha,
    };
    try {
      const response = await this.loginApi.login(params);
      console.log(response);
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @action onEmailChange = (e) => {
    this.email = e.target.value;
  };

  @action onPasswordChange = (e) => {
    this.password = e.target.value;
  };


  @action onCaptchaChange = (value) => {
    this.captcha = value;
  };
}

const loginStore = new LoginStore(loginApi);

export default loginStore;
