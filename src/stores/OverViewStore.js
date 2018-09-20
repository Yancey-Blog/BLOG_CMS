import {
  action, observable, configure, runInAction, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import overViewApi from '../http/OverViewApi';

configure({
  strict: 'always',
});

class OverViewStore {
  @observable RAMUsage;

  @observable diskUsage;

  @observable bandwidthUsage;

  @observable SWAPUsage;

  constructor() {
    this.overViewApi = overViewApi;
    this.RAMUsage = '';
    this.diskUsage = '';
    this.bandwidthUsage = '';
    this.SWAPUsage = '';
  }

  getServerData = async () => {
    try {
      const response = await this.overViewApi.getServerData();
      runInAction(() => {
        this.RAMUsage = Math.round(100 - response.data.mem_available_kb * 1024 / response.data.plan_ram * 100);
        this.diskUsage = Math.round(response.data.ve_used_disk_space_b / response.data.plan_disk * 100);
        this.bandwidthUsage = Math.round(response.data.data_counter / response.data.plan_monthly_data * 100);
        this.SWAPUsage = Math.round(100 - response.data.swap_available_kb / response.data.swap_total_kb * 100);
      });
    } catch (e) {
      message.error('unknown error!');
    }
  };
}

const overViewStore = new OverViewStore(overViewApi);

export default overViewStore;
