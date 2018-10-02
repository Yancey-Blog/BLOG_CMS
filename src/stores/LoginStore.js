import {
  action, observable, configure, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { loginApi } from '../http/index';
import history from '../history';

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
      window.localStorage.token = response.data.token;
      window.localStorage.expires_date = response.data.expires_date;
      history.push('/');
      this.email = '';
      this.password = '';
      this.captcha = '';
    } catch (e) {
      message.error(e.response.data.message);
    }
  };

  @computed get isFilled() {
    return this.email !== '' && this.password !== '' && this.captcha !== '';
  }

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
