import {
  action, observable, configure, runInAction, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { playerApi } from '../http/index';

configure({
  strict: 'always',
});

class PlayerStore {
  @observable dataSource;

  @observable artistData;

  @observable selectedRowKeys;

  @observable showModal;

  @observable modalType;

  @observable curId;

  @observable curShow;

  @observable title;

  @observable artist;

  @observable coverUrl;

  @observable musicFileUrl;

  @observable lrc;

  @observable imgUploadStatus;

  @observable musicUploadStatus;

  constructor() {
    this.playerApi = playerApi;
    this.dataSource = [];
    this.artistData = [];
    this.selectedRowKeys = [];
    this.showModal = false;
    this.curId = '';
    this.curShow = true;
    this.modalType = '';
    this.title = '';
    this.artist = '';
    this.coverUrl = '';
    this.musicFileUrl = '';
    this.lrc = '';
    this.imgUploadStatus = false;
    this.musicUploadStatus = false;
  }

  getData = async () => {
    try {
      const response = await this.playerApi.getData();
      runInAction(() => {
        this.dataSource = response.data;
        this.artistData.splice(0, this.artistData.length);
        // filter by artist
        const arr = [];
        const obj = {};
        for (let i = 0; i < response.data.length; i += 1) {
          arr.push(response.data[i].artist);
        }
        const noRepeatArr = Array.from(new Set(arr));
        for (let i = 0; i < noRepeatArr.length; i += 1) {
          obj.text = noRepeatArr[i];
          obj.value = noRepeatArr[i];
          this.artistData.push(obj);
        }
      });
    } catch (e) {
      message.error('unknown error!');
    }
  };

  insertData = async () => {
    const params = {
      title: this.title,
      artist: this.artist,
      cover: this.coverUrl,
      music_file_url: this.musicFileUrl,
      lrc: this.lrc,
      show: true,
    };
    try {
      await this.playerApi.insertData(params);
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
      artist: this.artist,
      cover: this.coverUrl,
      music_file_url: this.musicFileUrl,
      lrc: this.lrc,
      show: this.curShow,
    };
    try {
      await this.playerApi.modifyData(this.curId, params);
      this.showModal = false;
      message.success('modify success');
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  onSwitchShow = async (id, title, artist, coverUrl, musicFileUrl, lrc, checked) => {
    const params = {
      title,
      artist,
      cover: coverUrl,
      music_file_url: musicFileUrl,
      lrc,
      show: checked,
    };
    try {
      await this.playerApi.modifyData(id, params);
      if (checked) {
        message.success('the cover will be shown');
      } else {
        message.success('the cover will be hidden');
      }
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  deleteData = async (id) => {
    try {
      await this.playerApi.deleteData(id);
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
      await this.playerApi.batchDeleteData(params);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      this.selectedRowKeys.splice(0, this.selectedRowKeys.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @computed get isFilled() {
    return this.title !== '' && this.artist !== '' && this.coverUrl !== '' && this.lrc !== '' && this.musicFileUrl !== '';
  }

  @action onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };

  @action openModal = (type, id = '', title = '', artist = '', coverUrl = '', musicFileUrl = '', lrc = '', curShow) => {
    this.modalType = type;
    this.curId = id;
    this.curShow = curShow;
    this.title = title;
    this.artist = artist;
    this.coverUrl = coverUrl;
    this.musicFileUrl = musicFileUrl;
    this.lrc = lrc;
    this.showModal = true;
  };

  @action closeModal = () => {
    this.showModal = false;
    this.title = '';
    this.artist = '';
    this.coverUrl = '';
    this.musicFileUrl = '';
    this.lrc = '';
  };

  @action onTitleChange = (e) => {
    this.title = e.target.value;
  };

  @action onArtistChange = (e) => {
    this.artist = e.target.value;
  };

  @action onLrcChange = (e) => {
    this.lrc = e.target.value;
  };

  @action onImgUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.imgUploadStatus = true;
      return;
    }
    if (info.file.status === 'done') {
      this.imgUploadStatus = false;
      this.coverUrl = info.file.response.path;
    }
  };

  @action onMusicFileUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.musicUploadStatus = true;
    }
    if (info.file.status === 'removed') {
      this.musicFileUrl = '';
      this.musicUploadStatus = false;
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.musicFileUrl = info.file.response.path;
      this.musicUploadStatus = false;
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      this.musicUploadStatus = false;
    }
  };
}

const playerStore = new PlayerStore(playerApi);

export default playerStore;
