import {
  action, observable, configure, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { loginApi } from '../http/index';
import history from '../history';

configure({
  strict: 'always',
});

class ModifyPasswordStore {
  @observable email;

  @observable oldPassword;

  @observable newPassword;

  @observable confirmPassword;

  constructor() {
    this.loginApi = loginApi;
    this.email = '';
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  modifyPassword = async () => {
    const params = {
      email: this.email,
      old_password: this.oldPassword,
      new_password: this.newPassword,
    };
    try {
      await this.loginApi.modifyPassword(params);
      this.email = '';
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      message.success('Password has been modified!');
      message.success('You must ReLogin after 2 seconds...');
      window.localStorage.clear();
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } catch (e) {
      message.error(e.response.data.message);
    }
  };

  @computed get isFilled() {
    return this.email !== '' && this.oldPassword !== '' && this.newPassword !== '' && this.confirmPassword !== '';
  }

  @computed get checkPasswordEqual() {
    return this.newPassword === this.confirmPassword;
  }

  @action onEmailChange = (e) => {
    this.email = e.target.value;
  };

  @action onOldPasswordChange = (e) => {
    this.oldPassword = e.target.value;
  };

  @action onNewPasswordChange = (e) => {
    this.newPassword = e.target.value;
  };

  @action onConfirmPasswordChange = (e) => {
    this.confirmPassword = e.target.value;
  };


  @action handleModifyPassword = () => {
    if (!this.checkPasswordEqual) {
      message.error('Sorry, the new password and confirming password disagree!');
    } else {
      this.modifyPassword();
    }
  }
}

const modifyPasswordStore = new ModifyPasswordStore(loginApi);

export default modifyPasswordStore;
