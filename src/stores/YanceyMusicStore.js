import {
  action, observable, configure, runInAction, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { yanceyMusicApi } from '../http/index';
import { getCurrentDate } from '../util/tools';

configure({
  strict: 'always',
});

class YanceyMusicStore {
  @observable dataSource;

  @observable selectedRowKeys;

  @observable showModal;

  @observable modalType;

  @observable curId;

  @observable title;

  @observable cover;

  @observable soundCloudUrl;

  @observable releaseDate;

  @observable uploadStatus;

  constructor() {
    this.yanceyMusicApi = yanceyMusicApi;
    this.dataSource = [];
    this.selectedRowKeys = [];
    this.showModal = false;
    this.curId = '';
    this.modalType = '';
    this.title = '';
    this.cover = '';
    this.soundCloudUrl = '';
    this.releaseDate = '';
    this.uploadStatus = false;
  }

  getData = async () => {
    try {
      const response = await this.yanceyMusicApi.getData();
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
      cover: this.cover,
      soundCloud_url: this.soundCloudUrl,
      release_date: this.releaseDate,
    };
    try {
      await this.yanceyMusicApi.insertData(params);
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
      cover: this.cover,
      soundCloud_url: this.soundCloudUrl,
      release_date: this.releaseDate,
    };
    try {
      await this.yanceyMusicApi.modifyData(this.curId, params);
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
      await this.yanceyMusicApi.deleteData(id);
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
      await this.yanceyMusicApi.batchDeleteData(params);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      this.selectedRowKeys.splice(0, this.selectedRowKeys.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @computed get isFilled() {
    return this.title !== '' && this.cover !== '' && this.soundCloudUrl !== '' && this.releaseDate !== '';
  }

  @action onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };

  @action openModal = (type, id = '', title = '', soundCloudUrl = '', releaseDate = getCurrentDate(), cover = '') => {
    this.modalType = type;
    this.curId = id;
    this.title = title;
    this.soundCloudUrl = soundCloudUrl;
    this.releaseDate = releaseDate;
    this.cover = cover;
    this.showModal = true;
  };

  @action closeModal = () => {
    this.showModal = false;
    this.title = '';
    this.cover = '';
    this.soundCloudUrl = '';
    this.releaseDate = '';
  };

  @action onTitleChange = (e) => {
    this.title = e.target.value;
  };

  @action onSoundCloudUrlChange = (e) => {
    this.soundCloudUrl = e.target.value;
  };

  @action onReleaseDateChange = (date, dateString) => {
    this.releaseDate = dateString;
  };

  @action onUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.uploadStatus = true;
      return;
    }
    if (info.file.status === 'done') {
      this.uploadStatus = false;
      this.cover = info.file.response.path;
    }
  }
}

const yanceyMusicStore = new YanceyMusicStore(yanceyMusicApi);

export default yanceyMusicStore;
