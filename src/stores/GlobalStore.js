import { action, observable, configure } from 'mobx';
import { message } from 'antd/lib/index';
import { globalApi } from '../http/index';

configure({
  strict: 'always',
});

class GlobalStore {
  @observable userName;

  @observable fullSiteGrayStatus;

  @observable curId;

  constructor() {
    this.globalApi = globalApi;
    this.fullSiteGrayStatus = false;
    this.curId = '';
  }

  getData = async () => {
    try {
      const response = await this.globalApi.getData();
      this.curId = response.data._id; /* eslint-disable-line */
      this.fullSiteGrayStatus = response.data.full_site_gray;
    } catch (e) {
      message.error('unknown error!');
    }
  };

  insertFullSiteGrayData = async () => {
    const params = {
      full_site_gray: this.fullSiteGrayStatus,
    };
    try {
      await this.globalApi.insertFullSiteGrayData(params);
      message.success('insert success');
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  modifyFullSiteGrayData = async () => {
    const params = {
      full_site_gray: this.fullSiteGrayStatus,
    };
    try {
      const response = await this.globalApi.modifyFullSiteGrayData(this.curId, params);
      message.success(`turn ${response.data.full_site_gray ? 'on' : 'off'} gray`);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @action onFullSiteGray = (checked) => {
    this.fullSiteGrayStatus = checked;
    if (!this.curId) {
      this.insertFullSiteGrayData();
    } else {
      this.modifyFullSiteGrayData();
    }
  };
}

const globalStore = new GlobalStore(globalApi);

export default globalStore;
