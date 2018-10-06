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

  @observable loginStatus;

  constructor() {
    this.loginApi = loginApi;
    this.email = '';
    this.password = '';
    this.captcha = '';
    this.loginStatus = false;
  }

  login = async () => {
    const params = {
      email: this.email,
      password: this.password,
      response: this.captcha,
    };
    this.loginStatus = true;
    try {
      const response = await this.loginApi.login(params);
      window.localStorage.token = response.data.token;
      window.localStorage.expires_date = response.data.expires_date;
      message.success('Login Success!');
      history.push('/');
      this.email = '';
      this.password = '';
      this.captcha = '';
      this.loginStatus = false;
    } catch (e) {
      message.error(e.response.data.message);
      this.loginStatus = false;
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
