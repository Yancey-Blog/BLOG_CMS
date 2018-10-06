import {
  action, observable, configure, runInAction, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { serverStatusApi } from '../http/index';
import { formatJSONDate } from '../util/tools';

configure({
  strict: 'always',
});

class ServerStatusStore {
  @observable bandwidthDosage;

  @observable totalBandwidth;

  @observable diskDosage;

  @observable totalDisk;

  @observable SWAPDosage;

  @observable totalSWAP;

  @observable RAMDosage;

  @observable totalRAM;

  @observable timestampData;

  @observable networkInBytesData;

  @observable networkOutBytesData;

  @observable diskReadBytesData;

  @observable diskWriteBytesData;

  @observable cpuUsageData;

  @observable dataLength;

  @observable curTab;

  @observable serverStatusLoading;

  @observable serverUsageLoading;


  constructor() {
    this.serverStatusApi = serverStatusApi;
    this.bandwidthDosage = 0;
    this.totalBandwidth = 0;
    this.diskDosage = 0;
    this.totalDisk = 0;
    this.SWAPDosage = 0;
    this.totalSWAP = 0;
    this.RAMDosage = 0;
    this.totalRAM = 0;
    this.timestampData = [];
    this.networkInBytesData = [];
    this.networkOutBytesData = [];
    this.diskReadBytesData = [];
    this.diskWriteBytesData = [];
    this.cpuUsageData = [];
    this.dataLength = 12;
    this.curTab = 'oneHour';
    this.serverStatusLoading = false;
    this.serverUsageLoading = false;
  }

  @computed get bandwidthUsage() {
    return this.totalBandwidth === 0 ? 0 : Math.round(this.bandwidthDosage / this.totalBandwidth * 100);
  }

  @computed get diskUsage() {
    return this.totalDisk === 0 ? 0 : Math.round(this.diskDosage / this.totalDisk * 100);
  }

  @computed get RAMUsage() {
    return this.totalRAM === 0 ? 0 : Math.round(this.RAMDosage / this.totalRAM * 100);
  }

  @computed get SWAPUsage() {
    return this.totalSWAP === 0 ? 0 : Math.round(this.SWAPDosage / this.totalSWAP * 100);
  }

  getServerData = async () => {
    this.serverStatusLoading = true;
    try {
      const response = await this.serverStatusApi.getServerData();
      runInAction(() => {
        this.bandwidthDosage = (response.data.data_counter / 1024 / 1024 / 1024).toFixed(2);
        this.totalBandwidth = (response.data.plan_monthly_data / 1024 / 1024 / 1024).toFixed(2);
        this.diskDosage = (response.data.ve_used_disk_space_b / 1024 / 1024 / 1024).toFixed(2);
        this.totalDisk = (response.data.plan_disk / 1024 / 1024 / 1024).toFixed(2);
        this.RAMDosage = (response.data.plan_ram / 1024 / 1024 - response.data.mem_available_kb / 1024).toFixed(2);
        this.totalRAM = (response.data.plan_ram / 1024 / 1024).toFixed(2);
        this.SWAPDosage = (response.data.swap_total_kb / 1024 - response.data.swap_available_kb / 1024).toFixed(2);
        this.totalSWAP = (response.data.swap_total_kb / 1024).toFixed(2);
        this.serverStatusLoading = false;
      });
    } catch (e) {
      this.serverStatusLoading = false;
      // message.error('unknown error!');
    }
  };

  getRawUsageStatusData = async () => {
    this.serverUsageLoading = true;
    try {
      const response = await this.serverStatusApi.getRawUsageStatusData();
      runInAction(() => {
        for (let i = 0, l = response.data.data.length; i < l; i += 1) {
          this.timestampData.push(formatJSONDate(parseInt(response.data.data[i].timestamp, 10) * 1000));
          this.networkInBytesData.push(parseInt(response.data.data[i].network_in_bytes, 10));
          this.networkOutBytesData.push(parseInt(response.data.data[i].network_out_bytes, 10));
          this.diskReadBytesData.push(parseInt(response.data.data[i].disk_read_bytes, 10));
          this.diskWriteBytesData.push(parseInt(response.data.data[i].disk_write_bytes, 10));
          this.cpuUsageData.push(parseInt(response.data.data[i].cpu_usage, 10));
          this.serverUsageLoading = false;
        }
      });
    } catch (e) {
      this.serverUsageLoading = false;
      message.error('unknown error!');
    }
  };

  @action onSelectRange = (e) => {
    const value = e.target.value;
    this.curTab = value;
    if (value === 'sevenDays') {
      this.dataLength = 2016;
    } else if (value === 'oneDay') {
      this.dataLength = 288;
    } else if (value === 'halfDay') {
      this.dataLength = 144;
    } else {
      this.dataLength = 12;
    }
  };
}

const serverStatusStore = new ServerStatusStore(serverStatusApi);

export default serverStatusStore;
