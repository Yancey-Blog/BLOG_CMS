import {
  action, observable, configure, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { userInfoApi } from '../http/index';

configure({
  strict: 'always',
});

class UserInfoStore {
  @observable userName;

  @observable position;

  @observable selfIntroduction;

  @observable city;

  @observable avatar;

  @observable curId;

  constructor() {
    this.userInfoApi = userInfoApi;
    this.userName = '';
    this.position = '';
    this.selfIntroduction = '';
    this.city = '';
    this.avatar = '';
    this.curId = '';
  }

  getData = async () => {
    try {
      const response = await this.userInfoApi.getData();
      this.userName = response.data.user_name;
      this.position = response.data.position;
      this.selfIntroduction = response.data.self_introduction;
      this.city = response.data.city;
      this.avatar = response.data.avatar;
      this.curId = response.data._id; /* eslint-disable-line */
    } catch (e) {
      message.error('unknown error!');
    }
  };

  insertData = async () => {
    const params = {
      user_name: this.userName,
      position: this.position,
      self_introduction: this.selfIntroduction,
      city: this.city,
      avatar: this.avatar,
    };
    try {
      await this.userInfoApi.insertData(params);
      message.success('insert success');
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  modifyData = async () => {
    const params = {
      user_name: this.userName,
      position: this.position,
      self_introduction: this.selfIntroduction,
      city: this.city,
      avatar: this.avatar,
    };
    try {
      await this.userInfoApi.modifyData(this.curId, params);
      message.success('modify success');
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @computed get isFilled() {
    return this.userName && this.position && this.selfIntroduction && this.city && this.avatar;
  }

  @action onUserNameChange = (e) => {
    this.userName = e.target.value;
  };

  @action onPositionChange = (e) => {
    this.position = e.target.value;
  };

  @action onSelfIntroductionChange = (e) => {
    this.selfIntroduction = e.target.value;
  };

  @action onCityChange = (e) => {
    this.city = e.target.value;
  };

  @action onUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      this.avatar = info.file.response.path;
    }
  };

  onSubmitChange = () => {
    if (!this.curId) {
      this.insertData();
    } else {
      this.modifyData();
    }
  };
}

const userInfoStore = new UserInfoStore(userInfoApi);

export default userInfoStore;
