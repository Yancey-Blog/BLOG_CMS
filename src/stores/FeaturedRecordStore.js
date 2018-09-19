import {
  action, observable, configure, runInAction, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import featuredRecordApi from '../http/FeaturedRecordApi';

configure({
  strict: 'always',
});

class FeaturedRecordStore {
  @observable dataSource;

  @observable selectedRowKeys;

  @observable showModal;

  @observable modalType;

  @observable curId;

  @observable title;

  @observable poster;

  @observable url;

  @observable uploadStatus;

  constructor() {
    this.featuredRecordApi = featuredRecordApi;
    this.dataSource = [];
    this.selectedRowKeys = [];
    this.showModal = false;
    this.curId = '';
    this.modalType = '';
    this.title = '';
    this.poster = '';
    this.url = '';
    this.uploadStatus = false;
    this.getData();
  }

  getData = async () => {
    try {
      const response = await this.featuredRecordApi.getData();
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
      url: this.url,
    };
    try {
      const response = await this.featuredRecordApi.insertData(params);
      this.showModal = false;
      message.success('insert success');
      this.dataSource.splice(0, this.dataSource.length);
      this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  modifyData = async () => {
    const params = {
      title: this.title,
      poster: this.poster,
      url: this.url,
    };
    try {
      const response = await this.featuredRecordApi.modifyData(this.curId, params);
      this.showModal = false;
      message.success('modify success');
      this.dataSource.splice(0, this.dataSource.length);
      this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  deleteData = async (id) => {
    try {
      const response = await this.featuredRecordApi.deleteData(id);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  batchDelete = async () => {
    const params = {
      selectedList: this.selectedRowKeys,
    };
    try {
      const response = await this.featuredRecordApi.batchDeleteData(params);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      this.selectedRowKeys.splice(0, this.selectedRowKeys.length);
      this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @computed get isFilled() {
    return this.title !== '' && this.poster !== '' && this.url !== '';
  }

  @action onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };

  @action openModal = (type, id = '', title = '', poster = '', url = '') => {
    this.modalType = type;
    this.curId = id;
    this.title = title;
    this.poster = poster;
    this.url = url;
    this.showModal = true;
  };

  @action closeModal = () => {
    this.showModal = false;
    this.title = '';
    this.poster = '';
    this.url = '';
  };

  @action onTitleChange = (e) => {
    this.title = e.target.value;
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

const featuredRecordStore = new FeaturedRecordStore(featuredRecordApi);

export default featuredRecordStore;
