import {
  action, observable, configure, runInAction, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { coverApi } from '../http/index';

configure({
  strict: 'always',
});

class CoverStore {
  @observable dataSource;

  @observable selectedRowKeys;

  @observable showModal;

  @observable modalType;

  @observable curId;

  @observable curShow;

  @observable name;

  @observable coverUrl;

  @observable uploadStatus;

  constructor() {
    this.coverApi = coverApi;
    this.dataSource = [];
    this.selectedRowKeys = [];
    this.showModal = false;
    this.curId = '';
    this.curShow = true;
    this.modalType = '';
    this.name = '';
    this.coverUrl = '';
    this.uploadStatus = false;
  }

  getData = async () => {
    try {
      const response = await this.coverApi.getData();
      runInAction(() => {
        this.dataSource = response.data;
      });
    } catch (e) {
      message.error('unknown error!');
    }
  };

  insertData = async () => {
    const params = {
      name: this.name,
      url: this.coverUrl,
      show: true,
    };
    try {
      await this.coverApi.insertData(params);
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
      name: this.name,
      url: this.coverUrl,
      show: this.curShow,
    };
    try {
      await this.coverApi.modifyData(this.curId, params);
      this.showModal = false;
      message.success('modify success');
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  onSwitchShow = async (id, name, url, checked) => {
    const params = {
      name,
      url,
      show: checked,
    };
    try {
      const response = await this.coverApi.modifyData(id, params);
      if (checked) {
        message.success(`"${response.data.name}" will be shown`);
      } else {
        message.success(`"${response.data.name}" will be hidden`);
      }
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  deleteData = async (id) => {
    try {
      await this.coverApi.deleteData(id);
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
      await this.coverApi.batchDeleteData(params);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      this.selectedRowKeys.splice(0, this.selectedRowKeys.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @computed get isFilled() {
    return this.name !== '' && this.coverUrl !== '';
  }

  @action onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };

  @action openModal = (type, id = '', name = '', coverUrl = '', curShow) => {
    this.modalType = type;
    this.curId = id;
    this.curShow = curShow;
    this.name = name;
    this.coverUrl = coverUrl;
    this.showModal = true;
  };

  @action closeModal = () => {
    this.showModal = false;
    this.name = '';
    this.coverUrl = '';
  };

  @action onTitleChange = (e) => {
    this.name = e.target.value;
  };

  @action onUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.uploadStatus = true;
      return;
    }
    if (info.file.status === 'done') {
      this.uploadStatus = false;
      this.coverUrl = info.file.response.path;
    }
  };
}

const coverStore = new CoverStore(coverApi);

export default coverStore;
