import {
  action, observable, configure, runInAction, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { liveTourApi } from '../http/index';

configure({
  strict: 'always',
});

class LiveToursStore {
  @observable dataSource;

  @observable selectedRowKeys;

  @observable showModal;

  @observable modalType;

  @observable curId;

  @observable title;

  @observable poster;

  @observable uploadStatus;

  constructor() {
    this.liveTourApi = liveTourApi;
    this.dataSource = [];
    this.selectedRowKeys = [];
    this.showModal = false;
    this.curId = '';
    this.modalType = '';
    this.title = '';
    this.poster = '';
    this.uploadStatus = false;
  }

  getData = async () => {
    try {
      const response = await this.liveTourApi.getData();
      runInAction(() => {
        this.dataSource = response.data;
      });
    } catch (e) {
      message.error('unknown error!');
    }
  };

  insertData = async () => {
    const params = {
      title: this.title,
      poster: this.poster,
    };
    try {
      await this.liveTourApi.insertData(params);
      this.showModal = false;
      message.success('insert success');
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  modifyData = async () => {
    const params = {
      title: this.title,
      poster: this.poster,
    };
    try {
      await this.liveTourApi.modifyData(this.curId, params);
      this.showModal = false;
      message.success('modify success');
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  deleteData = async (id) => {
    try {
      await this.liveTourApi.deleteData(id);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  batchDelete = async () => {
    const params = {
      selectedList: this.selectedRowKeys,
    };
    try {
      await this.liveTourApi.batchDeleteData(params);
      message.success('delete success');
      this.selectedRowKeys.splice(0, this.selectedRowKeys.length);
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @computed get isFilled() {
    return this.title !== '' && this.poster !== '';
  }

  @action onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };

  @action openModal = (type, id = '', title = '', poster = '') => {
    this.modalType = type;
    this.curId = id;
    this.title = title;
    this.poster = poster;
    this.showModal = true;
  };

  @action closeModal = () => {
    this.showModal = false;
    this.title = '';
    this.poster = '';
  };

  @action onTitleChange = (e) => {
    this.title = e.target.value;
  };

  @action onIntroductionChange = (e) => {
    this.introduction = e.target.value;
  };

  @action onUrlChange = (e) => {
    this.url = e.target.value;
  };

  @action onUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.uploadStatus = true;
      return;
    }
    if (info.file.status === 'done') {
      this.uploadStatus = false;
      this.poster = info.file.response.path;
    }
  }
}

const liveTourStore = new LiveToursStore(liveTourApi);

export default liveTourStore;
