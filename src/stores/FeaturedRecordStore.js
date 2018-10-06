import {
  action, observable, configure, runInAction, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { featuredRecordApi } from '../http/index';
import { getCurrentDate } from '../util/tools';

configure({
  strict: 'always',
});

class FeaturedRecordStore {
  @observable dataSource;

  @observable selectedRowKeys;

  @observable showModal;

  @observable modalType;

  @observable curId;

  @observable albumName;

  @observable artist;

  @observable cover;

  @observable buyUrl;

  @observable releaseDate;

  @observable uploadStatus;

  constructor() {
    this.featuredRecordApi = featuredRecordApi;
    this.dataSource = [];
    this.selectedRowKeys = [];
    this.showModal = false;
    this.curId = '';
    this.modalType = '';
    this.albumName = '';
    this.artist = '';
    this.cover = '';
    this.buyUrl = '';
    this.releaseDate = '';
    this.uploadStatus = false;
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
      album_name: this.albumName,
      artist: this.artist,
      cover: this.cover,
      buy_url: this.buyUrl,
      release_date: this.releaseDate,
    };
    try {
      await this.featuredRecordApi.insertData(params);
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
      album_name: this.albumName,
      artist: this.artist,
      cover: this.cover,
      buy_url: this.buyUrl,
      release_date: this.releaseDate,
    };
    try {
      await this.featuredRecordApi.modifyData(this.curId, params);
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
      await this.featuredRecordApi.deleteData(id);
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
      await this.featuredRecordApi.batchDeleteData(params);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      this.selectedRowKeys.splice(0, this.selectedRowKeys.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @computed get isFilled() {
    return this.albumName !== '' && this.artist !== '' && this.cover !== '' && this.buyUrl !== '' && this.releaseDate !== '';
  }

  @action onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };

  @action openModal = (type, id = '', albumName = '', artist = '', buyUrl = '', releaseDate = getCurrentDate(), cover = '') => {
    this.modalType = type;
    this.curId = id;
    this.albumName = albumName;
    this.artist = artist;
    this.buyUrl = buyUrl;
    this.releaseDate = releaseDate;
    this.cover = cover;
    this.showModal = true;
  };

  @action closeModal = () => {
    this.showModal = false;
    this.albumName = '';
    this.artist = '';
    this.cover = '';
    this.buyUrl = '';
    this.releaseDate = '';
  };

  @action onAlbumNameChange = (e) => {
    this.albumName = e.target.value;
  };

  @action onArtistChange = (e) => {
    this.artist = e.target.value;
  };

  @action onBuyUrlChange = (e) => {
    this.buyUrl = e.target.value;
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

const featuredRecordStore = new FeaturedRecordStore(featuredRecordApi);

export default featuredRecordStore;
