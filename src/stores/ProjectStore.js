import {
  action, observable, configure, runInAction, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { projectApi } from '../http/index';

configure({
  strict: 'always',
});

class ProjectStore {
  @observable dataSource;

  @observable selectedRowKeys;

  @observable showModal;

  @observable modalType;

  @observable curId;

  @observable title;

  @observable introduction;

  @observable poster;

  @observable url;

  @observable uploadStatus;

  constructor() {
    this.projectApi = projectApi;
    this.dataSource = [];
    this.selectedRowKeys = [];
    this.showModal = false;
    this.curId = '';
    this.modalType = '';
    this.title = '';
    this.introduction = '';
    this.poster = '';
    this.url = '';
    this.uploadStatus = false;
  }

  getData = async () => {
    try {
      const response = await this.projectApi.getData();
      runInAction(() => {
        this.dataSource = response.data;
      });
    } catch (e) {
      message.error(e.message);
    }
  };

  insertData = async () => {
    const params = {
      title: this.title,
      introduction: this.introduction,
      poster: this.poster,
      url: this.url,
    };
    try {
      await this.projectApi.insertData(params);
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
      introduction: this.introduction,
      poster: this.poster,
      url: this.url,
    };
    try {
      await this.projectApi.modifyData(this.curId, params);
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
      await this.projectApi.deleteData(id);
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
      await this.projectApi.batchDeleteData(params);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      this.selectedRowKeys.splice(0, this.selectedRowKeys.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @computed get isFilled() {
    return this.title !== '' && this.introduction !== '' && this.poster !== '' && this.url !== '';
  }

  @action onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };

  @action openModal = (type, id = '', title = '', introduction = '', poster = '', url = '') => {
    this.modalType = type;
    this.curId = id;
    this.title = title;
    this.introduction = introduction;
    this.poster = poster;
    this.url = url;
    this.showModal = true;
  };

  @action closeModal = () => {
    this.showModal = false;
    this.title = '';
    this.introduction = '';
    this.poster = '';
    this.url = '';
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

const projectStore = new ProjectStore(projectApi);

export default projectStore;
